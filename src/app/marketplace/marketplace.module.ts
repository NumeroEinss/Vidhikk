import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketplaceRoutingModule } from './marketplace-routing.module';
import { MarketplaceComponent } from './marketplace.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { StarRatingModule } from 'angular-star-rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SellerProductProfileComponent } from './seller-product-profile/seller-product-profile.component';



@NgModule({
  declarations: [
    MarketplaceComponent,
    ProductDetailComponent,
    SellerProductProfileComponent
  ],
  imports: [
    CommonModule,
    MarketplaceRoutingModule,
    SharedModule,
    MaterialModule,
    StarRatingModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MarketplaceModule { }
