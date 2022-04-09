import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  public hostSession$;
  public connectSession$;

  constructor(private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
  }

  hostSession() {
    this.hostSession$ = this.dataService.hostSession();
    this.hostSession$.subscribe(message => {
      console.log(message);
      this.router.navigate(['host-home']);
    });
    
  }

  connectToSession() {
    this.connectSession$ = this.dataService.connectToSession();
    this.connectSession$.subscribe(message => {
      console.log(message);
      this.router.navigate(['connect-home']);
    });
  }
}
