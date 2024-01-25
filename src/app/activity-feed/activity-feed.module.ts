import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityFeedRoutingModule } from './activity-feed-routing.module';
import { ActivityFeedComponent } from './activity-feed.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ActivityFeedComponent
  ],
  imports: [
    CommonModule,
    ActivityFeedRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ActivityFeedModule {

}
