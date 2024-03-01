import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseLawRoutingModule } from './case-law-routing.module';
import { CaseLawListComponent } from './case-law-list/case-law-list.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { CaseLawDetailComponent } from './case-law-detail/case-law-detail.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { BareActsDetailComponent } from './bare-acts-detail/bare-acts-detail.component';

@NgModule({
  declarations: [
    CaseLawListComponent,
    CaseLawDetailComponent,
    BareActsDetailComponent,  
  ],
  imports: [
    CommonModule,
    FormsModule,
    CaseLawRoutingModule,
    SharedModule,
    MaterialModule,
    MatDatepickerModule
  ]
})
export class CaseLawModule { }
