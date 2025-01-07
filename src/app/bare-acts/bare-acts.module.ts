import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BareActsRoutingModule } from './bare-acts-routing.module';
import { BareActsComponent } from './bare-acts.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { BareActsDetailComponent } from './bare-acts-detail/bare-acts-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HighlightOnSearchPipe } from '../shared/pipe/highlight-on-search.pipe';


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
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [HighlightOnSearchPipe]
})
export class BareActsModule { }
