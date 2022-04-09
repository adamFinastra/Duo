import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-connect-requests',
  templateUrl: './connect-requests.component.html',
  styleUrls: ['./connect-requests.component.scss']
})
export class ConnectRequestsComponent implements OnInit {

  public requestLogs$;
  public requestLogs;

  public requests$;
  public requests;

  public computation$;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.requestLogs$ = this.dataService.requestLogs();
    this.requestLogs$.subscribe(message => {
      console.log(message);
      this.requestLogs = message.logs;
    });

    this.requests$ = this.dataService.seeRequests();
    this.requests$.subscribe(message => {
      console.log(message);
      this.requests = message.current_requests;
    });
  }

  runComputation(index) {
    this.computation$ = this.dataService.runComputation(index);
    this.computation$.subscribe(message => {
      console.log(message);
      alert("Result:" + message.result);
    });
  }

}
