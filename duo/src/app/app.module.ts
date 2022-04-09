import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModules } from './material-modules';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './containers/home-page/home-page.component';
import { ConnectHomeComponent } from './containers/connect-home/connect-home.component';
import { HostHomeComponent } from './containers/host-home/host-home.component';
import { HostRequestsComponent } from './containers/host-requests/host-requests.component';
import { ConnectRequestsComponent } from './containers/connect-requests/connect-requests.component';
import { NewDataComponent } from './containers/new-data/new-data.component';
import { HostHistoryComponent } from './containers/host-history/host-history.component';
import { AppContentComponent } from './components/app-content/app-content.component';
import { CreateRequestComponent } from './containers/create-request/create-request.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ConnectHomeComponent,
    HostHomeComponent,
    HostRequestsComponent,
    ConnectRequestsComponent,
    NewDataComponent,
    HostHistoryComponent,
    AppContentComponent,
    CreateRequestComponent
  ],
  imports: [
    MaterialModules,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
