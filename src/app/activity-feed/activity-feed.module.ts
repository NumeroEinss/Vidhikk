import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivityFeedRoutingModule } from './activity-feed-routing.module';
import { ActivityFeedComponent } from './activity-feed.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ActivityFeedComponent
  ],
  imports: [
    CommonModule,
    ActivityFeedRoutingModule,
    SharedModule
  ]
})
export class ActivityFeedModule { }
