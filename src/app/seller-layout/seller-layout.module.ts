import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellerLayoutRoutingModule } from './seller-layout-routing.module';
import { SellerLayoutComponent } from './seller-layout.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SellerLayoutComponent
  ],
  imports: [
    CommonModule,
    SellerLayoutRoutingModule,
    SharedModule
  ]
})
export class SellerLayoutModule { }
