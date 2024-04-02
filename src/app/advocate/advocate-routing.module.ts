import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvocateComponent } from './advocate.component';
import { AdvocateListComponent } from './advocate-list/advocate-list.component';
import { AdvocateSchedulingComponent } from './advocate-scheduling/advocate-scheduling.component';

const routes: Routes = [
  {
    path: '',
    component: AdvocateListComponent
  },
  {
    path: ':id',
    component: AdvocateComponent
  },
  {
    path: ':id/hire',
    component: AdvocateSchedulingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvocateRoutingModule { }
