import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-host-home',
  templateUrl: './host-home.component.html',
  styleUrls: ['./host-home.component.scss']
})
export class HostHomeComponent implements OnInit {

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
  }

  navigateToMyData() {
    this.router.navigate(['my-data']);
  }

  navigateToMyRequests() {
    this.router.navigate(['host-requests']);
  }

  navigateToMyHistory() {
    this.router.navigate(['host-history']);
  }

}
