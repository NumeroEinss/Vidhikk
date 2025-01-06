import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LawyerLayoutComponent } from './lawyer-layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LawyerLayoutRoutingModule } from './lawyer-layout-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    LawyerLayoutComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    LawyerLayoutRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class LawyerLayoutModule { }
