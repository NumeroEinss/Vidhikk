import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvocateRoutingModule } from './advocate-routing.module';
import { AdvocateComponent } from './advocate.component';
import { AdvocateListComponent } from './advocate-list/advocate-list.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { AdvocateSchedulingComponent } from './advocate-scheduling/advocate-scheduling.component';


@NgModule({
  declarations: [
    AdvocateComponent,
    AdvocateListComponent,
    AdvocateSchedulingComponent
  ],
  imports: [
    CommonModule,
    AdvocateRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class AdvocateModule { }
