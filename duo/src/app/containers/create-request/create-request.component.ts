import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { NgModule } from '@angular/core'

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.scss']
})
export class CreateRequestComponent implements OnInit {

  public data_store$;
  public data_store;

  public accessRequest$;
  public accessRequest;

  public name: string;
  public reason: string;
  public computation: string = "average";

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.data_store$ = this.dataService.seeDataStore();
    this.data_store$.subscribe(message => {
      console.log(message);
      this.data_store = message.data_store;
    });
  }

  requestAccess(row) {
    console.log(this.name);
    console.log(this.reason);
    console.log(this.computation);
    

    this.accessRequest$ = this.dataService.requestData(row.index, this.computation, this.name, this.reason);
    this.accessRequest$.subscribe(message => {
      console.log(message);
      this.router.navigate(['connect-home']);
    });
  }

}
