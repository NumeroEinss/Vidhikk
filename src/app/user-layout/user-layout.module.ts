import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLayoutRoutingModule } from './user-layout-routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { UserLayoutComponent } from './user-layout.component';


@NgModule({
  declarations: [UserLayoutComponent],
  imports: [
    CommonModule,
    UserLayoutRoutingModule,
    MatSidenavModule,
    SharedModule,
    MaterialModule
  ]
})
export class UserLayoutModule { }
