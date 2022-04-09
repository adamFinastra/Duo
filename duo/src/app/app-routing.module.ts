import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent} from './containers/home-page/home-page.component';
import { ConnectHomeComponent } from './containers/connect-home/connect-home.component';
import { HostHomeComponent } from './containers/host-home/host-home.component';
import { HostRequestsComponent } from './containers/host-requests/host-requests.component';
import { NewDataComponent } from './containers/new-data/new-data.component';
import { HostHistoryComponent } from './containers/host-history/host-history.component';
import { ConnectRequestsComponent } from './containers/connect-requests/connect-requests.component';
import { CreateRequestComponent } from './containers/create-request/create-request.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
    data: {
      viewId: 'home'
    }
  },
  {
    path: 'host-home',
    pathMatch: 'full',
    component: HostHomeComponent,
    data: {
      viewId: 'host-home'
    }
  },
  {
    path: 'connect-home',
    pathMatch: 'full',
    component: ConnectHomeComponent,
    data: {
      viewId: 'home'
    }
  },
  {
    path: 'my-data',
    pathMatch: 'full',
    component: NewDataComponent,
    data: {
      viewId: 'my-data'
    }
  },
  {
    path: 'host-requests',
    pathMatch: 'full',
    component: HostRequestsComponent,
    data: {
      viewId: 'host-requests'
    }
  },
  {
    path: 'host-history',
    pathMatch: 'full',
    component: HostHistoryComponent,
    data: {
      viewId: 'host-history'
    }
  },
  {
    path: 'connect-requests',
    pathMatch: 'full',
    component: ConnectRequestsComponent,
    data: {
      viewId: 'connect-requests'
    }
  },
  {
    path: 'create-request',
    pathMatch: 'full',
    component: CreateRequestComponent,
    data: {
      viewId: 'create-request'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
