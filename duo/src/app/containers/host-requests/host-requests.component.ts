import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-host-requests',
  templateUrl: './host-requests.component.html',
  styleUrls: ['./host-requests.component.scss']
})
export class HostRequestsComponent implements OnInit {

  public requests$;
  public requests;

  public requestDecision$;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests() {
    this.requests$ = this.dataService.seeRequests();
    this.requests$.subscribe(message => {
      console.log(message);
      this.requests = message.current_requests;
    });
  }

  makeDecision(element, decision) {
    this.requestDecision$ = this.dataService.requestDecision(element.index, decision);
    this.requestDecision$.subscribe(message => {
      console.log(message);
      this.loadRequests();
    })
  }
}
