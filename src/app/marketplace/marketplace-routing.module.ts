import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketplaceComponent } from './marketplace.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SellerProductProfileComponent } from './seller-product-profile/seller-product-profile.component';

const routes: Routes = [
  {
    path: '',
    component: MarketplaceComponent
  },
  {
    path: 'productDetail',
    component: ProductDetailComponent
  },
  {
    path: 'sellerProfile',
    component: SellerProductProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarketplaceRoutingModule { }
