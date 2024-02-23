import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConferenceListComponent} from './conference-list/conference-list.component';
import { ConferenceComponent } from './conference.component';
// import {ConferenceComponent} from './conference.component';

const routes: Routes = [

  {
    path:'',
    component:ConferenceListComponent,
  },
  {
    path:':id',
    component:ConferenceComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConferenceRoutingModule { }
