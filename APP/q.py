import asyncio
from quart import Quart, jsonify, request
import syft as sy
import asyncio 
import argparse
import torch as th
import pandas as pd
import numpy as np
import json
import datetime



app = Quart(__name__)

#A reference back to our duet object
global s 
s = {}
s["computations"] = []
s["request_logs"] = []

async def f_welcome():
    return "<h4>Welcome</h4>"

@app.route("/")
async def welcome():
	'''
	Welcome Page for the Data Owner and FI
	'''
	w = await f_welcome()
	return w

async def f_host_session():
	duet=sy.launch_duet("network_url=http://localhost:5000",loopback=True)
	s["duet"] = duet
	return duet

@app.route("/host_session", methods=["GET"])
async def host_session():
	'''
	Data owner to host a session
	'''
	duet = await f_host_session()
	return jsonify({"status":"session hosted"})
	#return "<h4>Session Hosted</h4>"

async def f_connect_session():
	duet = sy.join_duet(loopback=True)
	s["duet"] = duet 
	return duet 

@app.route("/connect_session",methods=["GET"])
async def connect_session():
	'''
	FI to connect to a hosted session by the data owner
	'''
	duet = await f_connect_session()
	return jsonify({"status":"session connected"})
	#return "<h4>Session Connected</h4>"



@app.route("/store_data", methods=["GET","POST"])
async def store_data():
	'''
	Data Owner can upload data to the data store which is searchable by the FI
	'''
	try:
		data = await request.get_json() 
		df = pd.DataFrame(data["data"])   
		df.reset_index(inplace=True)
		ts = th.tensor(df.values).float().tag(data["tag"])
		ts = ts.describe(data["description"])
		ptr = ts.send(s["duet"],searchable=True)
		d = {"status": "data storage complete"}
		return jsonify(d)
	except Exception as E: 
		print(E)
		return jsonify({"status": "failure to load data to the data store, please try again"})

async def f_see_data_store():
	df_data = s["duet"].store.pandas
	return df_data

@app.route("/see_data_store", methods=["GET"])
async def see_data_store():
	'''
	Data Owner and FI can view data in the datastore 
	'''
	try:
		df_data = await f_see_data_store()
		X = df_data.copy()
		if X.empty: 
			return jsonify({"data_store":[{}]})
		else:
			X['Filename'] = [''.join(map(str, l)) for l in X['Tags']]
			df_data = X.reset_index()[["index","Description","Filename"]]
			d_data = df_data.to_dict(orient="records")
			return jsonify({"data_store":d_data})
		#return df_data.to_html()
	except Exception as E: 
		return jsonify({"status": "not able to retrieve records from the data store"})
		#return "<h4>No Data In the DataStore</h4>"


async def f_see_requests():
	df_requests = s["duet"].requests.pandas
	return df_requests

@app.route("/see_requests", methods=["GET","POST"])
async def see_requests():
	try:
		df_requests = await f_see_requests()
		print("DF REQUESTS")
		print(df_requests)
		if df_requests.empty:
			d_requests = {"current_requests": [{}]}
			return jsonify(d_requests)
			#return "<h4>There Are No Current Requests</h4>"
		else:
			df_requests = df_requests.reset_index()
			X = df_requests.copy()
			X['Requested Access'] = ['_'.join(map(str, l)) for l in X["Requested Object's tags"]]
			X = X[["index","Requested Access", "Reason"]]
			d_requests = {"current_requests": X.to_dict(orient="records")}
			return jsonify(d_requests)
			#return df_requests.to_html()
	except Exception as E: 
		return jsonify({"status": "Not able to retrieve current requests"})
		#return "<h4>No Current Requests</h4>"


@app.route("/request_data", methods=["POST"])
async def request_data():
	'''
	POST: data = {"idx":"index of the data in the datastore", "computation":"average", "name": "Average XX", "Reason": ""}
	'''
	try:
		data = await request.get_json() 
		if data["computation"] == "average": 
			comp = s["duet"].store[int(data["idx"])].mean()
		elif data["computation"] == "median":
			comp =  s["duet"].store[int(data["idx"])].median()
		elif data["computation"] == "max":
			comp =  s["duet"].store[int(data["idx"])].max()
		elif data["computation"] == "min":
			comp =  s["duet"].store[int(data["idx"])].min()
		elif data["computation"] == "median":
			comp =  s["duet"].store[int(data["idx"])].median()
		s["computations"].append(comp)
		#comp.request(reason=data["reason"])
		#s["duet"].store[data["idx"]].request(reason=data["reason"])
		comp.request(reason=data["reason"])
		return jsonify({"computation_index": len(s["computations"])-1}) #Computation index is used in the run computation index
		#else: 
		#	return jsonify({"error": "error"})
	except Exception as E: 
		print(E)
		return jsonify({"error": "Failure to create request, please try again"})

@app.route("/request_decision", methods=["POST"])
async def request_decision():
	'''
	POST: data = {"idx": "index of the request, e.g. 0,1,2", "decision": "approve or deny"}
	'''
	try:
		data = await request.get_json()
		reason = s["duet"].requests.pandas.iloc[int(data["idx"])].Reason
		t = datetime.datetime.now()
		if data["decision"] == "approve": 
			s["duet"].requests[int(data["idx"])].accept()
			print("APPROVED")
		else:
			s["duet"].requests[int(data["idx"])].deny()
			print("DENIED")
		s["request_logs"].append([reason,data["decision"],t])
		return jsonify({"index": data["idx"], "Reason": reason, "Decision": data["decision"]})
	except Exception as E: 
		print(E)
		return jsonify({"error": "Failure to approve or deny data access request, please try again"})

@app.route("/request_logs",methods=["GET"])
async def request_logs():
	df_request_logs = pd.DataFrame(s["request_logs"],columns=["Request Reason","Decision","Decision Timestamp"])
	if df_request_logs.empty:
		return jsonify({"logs": [{}]})
		#return "<h4>No Requests in the log.</h4>"
	else:
		return jsonify({"logs": df_request_logs.to_dict(orient="records")})
		#return df_request_logs.to_html()

@app.route("/run_computation",methods=["GET","POST"])
async def run_computation():
	'''
	POST: data = {"idx":0,1,2....}
	'''
	try:
		data = await request.get_json()
		print("------------------")
		print("IDX:", data["idx"])
		print(s)
		print(s["computations"][int(data["idx"])])
		print("------------------")
		result = jsonify({"result": str(float(s["computations"][int(data["idx"])].get(delete_obj=True)))})
		return result
	except Exception as E: 
		print(E)
		return jsonify({"result": "No Access to Run Computation"})


#def approve_deny_request():


if __name__ == "__main__":
	parser = argparse.ArgumentParser(description='Description of your program')
	parser.add_argument('-p','--port', help='Port_number', required=True)
	args = vars(parser.parse_args())
	loop = asyncio.get_event_loop()
	app.run(debug=1,loop=loop,port=args["port"])   