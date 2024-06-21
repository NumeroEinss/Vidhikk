import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BareActsRoutingModule } from './bare-acts-routing.module';
import { BareActsComponent } from './bare-acts.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    BareActsComponent
  ],
  imports: [
    CommonModule,
    BareActsRoutingModule,
    SharedModule,
    MaterialModule,
  ]
})
export class BareActsModule { }
