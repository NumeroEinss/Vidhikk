import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvocateRoutingModule } from './advocate-routing.module';
import { AdvocateComponent } from './advocate.component';
import { AdvocateListComponent } from './advocate-list/advocate-list.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { AdvocateSchedulingComponent } from './advocate-scheduling/advocate-scheduling.component';
import { AdvocateRatingComponent } from './advocate-rating/advocate-rating.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { StarRatingModule } from 'angular-star-rating';


@NgModule({
  declarations: [
    AdvocateComponent,
    AdvocateListComponent,
    AdvocateSchedulingComponent,
    AdvocateRatingComponent
  ],
  imports: [
    CommonModule,
    AdvocateRoutingModule,
    SharedModule,
    MaterialModule,
    MatProgressBarModule,
    StarRatingModule.forRoot()
  ]
})
export class AdvocateModule { }
