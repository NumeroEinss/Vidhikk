import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BareActsRoutingModule } from './bare-acts-routing.module';
import { BareActsComponent } from './bare-acts.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { BareActsDetailComponent } from './bare-acts-detail/bare-acts-detail.component';


@NgModule({
  declarations: [
    BareActsComponent,
    BareActsDetailComponent
  ],
  imports: [
    CommonModule,
    BareActsRoutingModule,
    SharedModule,
    MaterialModule,
  ]
})
export class BareActsModule { }
