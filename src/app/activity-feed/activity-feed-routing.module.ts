import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActivityFeedComponent } from './activity-feed.component';
import { PageNotFoundComponent } from '../shared/component/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: ActivityFeedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivityFeedRoutingModule { }
