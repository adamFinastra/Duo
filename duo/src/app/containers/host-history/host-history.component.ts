import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-host-history',
  templateUrl: './host-history.component.html',
  styleUrls: ['./host-history.component.scss']
})
export class HostHistoryComponent implements OnInit {

  public requestLogs$;
  public requestLogs;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.requestLogs$ = this.dataService.requestLogs();
    this.requestLogs$.subscribe(message => {
      console.log(message);
      this.requestLogs = message.logs;
    });
  }

}
