<p align="center">
	<img src="DuoImages/duo_logo.png" alt="drawing" width="200"/></center>
</p>

>🎶 Jack and Jill went up the hill to share a bit of data, Jill said please and Jack agreed, and data was safely transferred 🎶
# What is Duo?

In an age where data privacy has never been more important, Duo is an application that allows data owners to connect to their financial institution in a safe and secure manner, through the power of cryptography and machine learning. Duo allows customers to own their own data and grant the FI access, as needed, to run computations and gain insights that are executed on the data owners computer, not machines on the financial institution's side. Data never leaves the customer's computer and all computations the FI are interested in are first approved by the customer and run on the customer's computer. Duo also provides interpretability on how and why your data is being accessed and used.  Duo makes owning and sharing your data with your financial institution safe, secure, and easy. 

## Who Are the Credit Invisible?

A person is said to be "credit invisible" if they have no credit history or report at any of the three national credit bureaus (Experian, TransUnion and Equifax). The Consumer Financial Protection Bureau (CFPB) estimates that 26 million U.S. consumers are credit invisible, roughly 11% of the adult population. Disadvantages of being credit invisible include but are not limited to:
- Difficulty obtaining housing, often times much more expensive
- Difficulty qualifying for credit cards 
- Borrowing money is much more expensive
- More likely to turn towards payday lenders


## Why is Data Privacy Important?

As consumers, we provide a high degree of information that is sensitive and needs to be kept secure. From credit card numbers to information about our children to medical records to emails and more, our data tells our life story. If data is leaked or breached, our well-being could be in trouble. Data privacy is important because we need to ensure the data we voluntarily turn over to a 3rd party is accessed in a responsible manner and stored securely. On the other hand, data powers the services that 3rd parties offer and they must have access at hand to innovate and develop solutions that make our life easier and better. A chicken and egg problem, we need to give access to data but ensure that it is kept safe and secure. 

## What is the Technology Behind Duo?
Duo allows a data owner to launch a server and connect to a node that they host (local machine, azure, aws, etc.). The data owner and the financial institution are connected behind a firewall through the mutual connection to the node. When both parties are connected, metadata about their network connection is sent to the external node, like other similar peer-to-peer technology, which creates a direct connection between the data owner and the FI. The data owner can load data on their machine to the data store and allow the FI to search for what's available. The FI can send requests and reasons to access certain computations on data in the form of pointers and upon approval secure multi-party computation brings the computation to the data owner and the result is sent back to the FI. This ensures that data stays on the data owner's machine and that the FI never receives or is able to store any data on their servers.


## How Does Alternative Data Help?
Without a strong trace of credit, it can be hard for the credit invisible to prove a track record. Alternative data, in the credit invisible sense, is information that is not included in traditional credit reports from the big 3. It can include many different types of data not limited to: from rent payments, cellular bills, browsing history, utility bills, subscriptions, social media data, and much more. Various studies have shown that this data can be leveraged to understand someone's ability to repay a loan and help establish reliability when there is no traditional credit history. 

The down side of these alternative data sources are that they hold very private information that can be dangerous to have floating on servers the customer does not have access to. For example, imaging your social media data and browsing history being leaked. There is battle between providing this sensitive and personal alternative data and allowing institutions to access it to better assess your credit worthiness. 

This is where Duo helps -- we allow customers to own their data and approve and audit all requests sent from the FI. They know how and why their data is being used and know that all computations and requests are executed on their computer. Their data is not moved or stored anywhere. 

## What Duo Offers
In addition to a front-end application to connect data owners and financial institutions in a safe and secure manner, Duo offers a set of API endpoints to enable secure data sharing as a service such that you can integrate the functionality into your existing products and solutions.

## Our Endpoints

Below are the endpoints that power Duo:
- /host_session
	> Allows the customer to kickstart and host a session that the financial institution can connect to
	
	>Returns: {"status":"session hosted"} when the FI connects and the session been connected 
- /connect_session 
    > Allows the FI to join a session hosted by the data owner 
    
    > Returns: {"status": "session connected"} when the FI has connected to the data owner's hosted session
- /store_data 
    > Allows the data owner to submit data to a data store that is searchable by the FI 
    
    > Sample POST: data (list), tag (str), description (str)
    
        curl -i -H "Content-Type: application/json" -X POST -d '{"data":[1,2,3,4,5,12], "tag": "utility", "description": "my 2021 utility bills"}' http://localhost:5001/store_data
    
    > Returns: {"status": "data storage complete"} upon successful storing of data and {"status": "failure to load data to the data store, please try again"} upon unsuccessful storage of data to the datastore

- /see_data_store 
    > Allows both the data owner and the financial institution to see data that the data owner has submitted to the data store 
    
    > Returns: {"data_store": [{"Description", "Filename", "index"}, ... , {}]

		sample_response = {
		  "data_store": [
		    {
		      "Description": "my netflix subscriptions", 
		      "Filename": "netflix", 
		      "index": 0
		    }, 
		    {
		      "Description": "my 2021 utility bills", 
		      "Filename": "utility", 
		      "index": 1
		    }
		  ]
		}

- /see_requests 
    > Allows  the data owner to see requests currently in the queue by the FI 
    
    > Returns: {"current_requests": [{"Reason", "Requested Access", "index"}, ... , {}]

		sample_response = {
	  "current_requests": [
		    {
	      "Reason": "I need to know the minimum utility payment", 
	      "Requested Access": "utility_min", 
	      "index": 0
		    }
		  ]
		}
- /request_data 
    > Allows  the FI to request a computation on data in the data store, requires approval from the data owner
    > Returns: {"computation_index": 0} where computation index is an index that stores the requested computation to be used in the /run_computation endpoint
    
		sample_response = {

				"computation_index": 3
			}

- /request_decision
    > Allows the data owner to accept or deny a request from the FI
    > Sample POST: id (int), decision (str)

		curl -i -H "Content-Type: application/json" -X POST -d '{"id": 0, "decision":"deny"}' http://localhost:5001/request_decision
     > 		sample_response = {"Decision": "deny","Reason": "I need to know the minimum utility payment","index": 0}

- /request_logs 
    > Allows the data owner to see all of their requests and approvals/denials from the FI
    
		 samle_respnse = {
		  "logs": [
		    {
		      "Decision": "deny", 
		      "Decision Timestamp": "Thu, 31 Mar 2022 13:38:33 GMT", 
		      "Request Reason": "I need to know the max netflix  payment"
		    }, 
		    {
		      "Decision": "approve", 
		      "Decision Timestamp": "Thu, 31 Mar 2022 13:38:52 GMT", 
		      "Request Reason": "I need to know the maximum utility payment"
		    }, 
		    {
		      "Decision": "deny", 
		      "Decision Timestamp": "Thu, 31 Mar 2022 13:40:27 GMT", 
		      "Request Reason": "I need to know the max netflix  payment"
		    }, 
		    {
		      "Decision": "deny", 
		      "Decision Timestamp": "Thu, 31 Mar 2022 13:41:47 GMT", 
		      "Request Reason": "I need to know the minimum utility payment"
		    }
		  ]
		}
   
 - /run_computation
    > Allows the FI to run a requested computation 
    > Sample Post: ix is the index of the computation returned from /request_data

		curl -i -H "Content-Type: application/json" -X POST -d '{"ix": 3}' http://localhost:5002/run_computation

   > Sample Responses:
   
		   {"result": "No Access to Run Computation"}
			or
			{"result": "12.75"}

## Duo Environment
We have created an environment.yml file for you to spin up the exact environment we used when creating Duo. To start, open a terminal and run:
		
	conda env create -f environment.yml 

This will create a virtual conda environment called <i>syft_env</i>. 

To activate the virtaul environment run:

	source activate syft_env

To deactivate the virtal environment run: 

	source deactivate syft_env

Leveraging this conda environment will install all the necessary dependencies and libraries to run the quart API app below. 

## Launching the API

* **Launch the credit invisible data owner session on port 5001:**
		Open a terminal session and run:
		
		python q.py --port 5001

* **Launch the Financial Institution data on port 5002:**
	Open a terminal session and run:
		
		python q.py --port 5002

* **Host Session from credit invisible data owner:**
Open browser and navigate to http://localhost:5001/host_session 

* **Connect Session from financial institution:**
Open browser and navigate to http://localhost:5002/connect_session 

* **Post data from credit invisible data owner:**

	Open a terminal session and run to post some sample data:

		curl -i -H "Content-Type: application/json" -X POST -d '{"data":[1,2,3,4,5], "tag": "netflix", "description": "my netflix subscriptions"}' http://localhost:5001/store_data

* **See data store from credit invisible data owner or financial institution:** 
*Open browser and navigate to http://localhost:5001/see_data_store 

* **Financial institution request access to compute on dataset:**
Open a terminal session and run:

		curl -i -H "Content-Type: application/json" -X POST -d '{"idx": 0, "computation":"max", "name": "max netfix Payment", "reason": "I need to know the max netflix  payment"}' http://localhost:5002/request_data

* **Credit invisible data owner approve/deny financial institution request:**
Open a terminal session and run:

		curl -i -H "Content-Type: application/json" -X POST -d '{"id": 0, "decision":"approve"}' http://localhost:5001/request_decision

	or
	
		curl -i -H "Content-Type: application/json" -X POST -d '{"id": 0, "decision":"deny"}' http://localhost:5001/request_decision

* **Financial institution run computation after approval/denial:**
Open a terminal session and run:

		curl -i -H "Content-Type: application/json" -X POST -d '{"ix": 0}' http://localhost:5002/run_computation


## The Application
<p>Our application takes on two personas. Jack is classified as credit invisible and is looking to obtain a credit card. Jill is a loan officer leveraging Duo to access Jack's data in a secure fashion to help him secure his first credit card. Jack starts a Duo session that Jill connects to. Jack uploads his alternative data and Jill is able to discover what is available in the meta datastore. Jill can request computations that run on Jack's machine, but Jack has the power to approve and deny requests he does or does not see fit. If approved, Jill can retrieve data answers for her requests. No raw data ever leaves Jack's machhine and he has full control and interpretability over his data. He can access his logs to see what and why his data was requested and being used for. Duo allows the credit invisible to work with financial institutions to obtain credit while keeping full ownership over their data.</p> 
<p><b>Credit Invisible Data Owner:</b></p>
<p float="left">
<img src="/DuoImages/Jack_Host.png" alt="drawing" width="200"/>
<img src="/DuoImages/Jack_Home.png" alt="drawing" width="200"/>
<img src="/DuoImages/Jack_Load_Data.png" alt="drawing" width="200"/>
<img src="/DuoImages/Jack_Requests.png" alt="drawing" width="200"/>
</p>
<img src="/DuoImages/Duo_data_owner.png" alt="drawing" width="800"/>
<br>
<p><b>Financial Institution:</b></p>
<p float="left">
<img src="/DuoImages/Jill_start.png" alt="drawing" width="200"/>
<img src="/DuoImages/Jill_Connect.png" alt="drawing" width="200"/>
<img src="/DuoImages/Jill_Home.png" alt="drawing" width="200"/>
<img src="/DuoImages/Jill_Requests.png" alt="drawing" width="200"/>
</p>
<img src="/DuoImages/Duo_FI.png" alt="drawing" width="800"/>
<br>

## Check It Out
[![Watch the video](https://www.youtube.com/watch?v=pJbquqDuHdg)]


## Resources 
- https://www.nclc.org/images/pdf/credit_reports/ib-credit-invisib-alt-data-july19.pdf 
- https://inpher.io/technology/what-is-secure-multiparty-computation/ 
- https://dp-ml.github.io/2021-workshop-ICLR/files/35.pdf 
- https://blog.openmined.org/duet-opengrid-infrastructure-for-easy-remote-data-science/
- https://courses.openmined.org/