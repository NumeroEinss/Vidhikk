import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvocateComponent } from './advocate.component';
import { AdvocateListComponent } from './advocate-list/advocate-list.component';
import { AdvocateSchedulingComponent } from './advocate-scheduling/advocate-scheduling.component';
import { AdvocateRatingComponent } from './advocate-rating/advocate-rating.component'

const routes: Routes = [
  {
    path: '',
    component: AdvocateListComponent
  },
  {
    path: 'view',
    component: AdvocateComponent
  },
  {
    path: 'view/hire',
    component: AdvocateSchedulingComponent
  },
  {
    path: 'view/advocate-rating',
    component: AdvocateRatingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvocateRoutingModule { }
