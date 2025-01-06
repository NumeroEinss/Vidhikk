import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../shared/component/page-not-found/page-not-found.component';
import { SellerLayoutComponent } from './seller-layout.component';
import { GlobalSearchComponent } from '../shared/component/global-search/global-search.component';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'user-profile',
        loadChildren: () =>
          import('../user-profile/user-profile.module').then(
            (m) => m.UserProfileModule
          ),
      },
      {
        path:'marketplace',
        loadChildren: ()=> import('../marketplace/marketplace.module').then(m=>m.MarketplaceModule)
      },
      {
        path: 'transactions',
        loadChildren: () =>
          import('../transactions/transactions.module').then((m) => m.TransactionsModule),
      },
      {
        path: 'contact-us',
        loadChildren: () =>
          import('../contact-us/contact-us.module').then((m) => m.ContactUsModule),
      },
      {
        path: 'global-search',
        component: GlobalSearchComponent,
      },
      {
        path: 'resetPassword',
        component: ResetPasswordComponent
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerLayoutRoutingModule { }
