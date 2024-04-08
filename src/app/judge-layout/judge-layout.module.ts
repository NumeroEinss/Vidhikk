import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JudgeLayoutRoutingModule } from './judge-layout-routing.module';
import { JudgeLayoutComponent } from './judge-layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    JudgeLayoutComponent
  ],
  imports: [
    CommonModule,
    JudgeLayoutRoutingModule,
    MatSidenavModule,
    SharedModule,
    MaterialModule
  ]
})
export class JudgeLayoutModule { }
