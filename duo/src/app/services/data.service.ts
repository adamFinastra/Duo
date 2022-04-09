import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timer, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpClient: HttpClient) { }

  //  curl -i -H "Content-Type: application/json" -X POST -d '{"data":[1,2,3,4,5,12], "tag": "utility", "description": "my 2021 utility bills"}' http://localhost:5001/store_data
  submitData(data, tag, description) : Observable<Object> {
    let body = {
      data: data,
      tag: tag,
      description: description
    }
    return this.httpClient.post<Object>("http://localhost:5001/store_data", body);
  }

  seeDataStore() : Observable<Object> {
    return this.httpClient.get<Object>("http://localhost:5001/see_data_store");
  }

  seeRequests() : Observable<Object> {
    return this.httpClient.get<Object>("http://localhost:5001/see_requests");
  }

  requestLogs() : Observable<Object> {
    return this.httpClient.get<Object>("http://localhost:5001/request_logs");
  }

  hostSession() : Observable<Object> {
    console.log("HOST SESSION");
    return this.httpClient.get<Object>("http://localhost:5001/host_session");
  }

  connectToSession() : Observable<Object> {
    return this.httpClient.get<Object>("http://localhost:5002/connect_session");
  }

  //   curl -i -H "Content-Type: application/json" -X POST -d '{"idx": 0, "decision":"deny"}' http://localhost:5001/request_decision
  //   curl -i -H "Content-Type: application/json" -X POST -d '{"idx": 0, "decision":"approve"}' http://localhost:5001/request_decision

  requestDecision(idx, decision) : Observable<Object> {
    let body = {
      idx: idx,
      decision: decision
    }
    return this.httpClient.post<Object>("http://localhost:5001/request_decision", body);
  }


  //  curl -i -H "Content-Type: application/json" -X POST -d '{"idx": 0, "computation":"max", "name": "max netfix Payment", "reason": "I need to know the max netflix  payment"}' http://localhost:5002/request_data
  requestData(idx, computation, name, reason) : Observable<Object> {
    let body = {
      idx: idx,
      computation: computation,
      name: name,
      reason: reason
    }
    return this.httpClient.post<Object>("http://localhost:5002/request_data", body);
  }


  //curl -i -H "Content-Type: application/json" -X POST -d '{"idx": 0}' http://localhost:5002/run_computation
  runComputation(idx) : Observable<Object> {
    let body = {
      idx: idx
    }
    return this.httpClient.post<Object>("http://localhost:5002/run_computation", body);
  }
}
