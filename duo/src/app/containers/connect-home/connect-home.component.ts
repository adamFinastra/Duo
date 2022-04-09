import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-connect-home',
  templateUrl: './connect-home.component.html',
  styleUrls: ['./connect-home.component.scss']
})
export class ConnectHomeComponent implements OnInit {

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
  }

  navigateToConnectRequests() {
    this.router.navigate(['connect-requests']);
  }

  navigateToCreateRequest() {
    this.router.navigate(['create-request']);
  }

}
