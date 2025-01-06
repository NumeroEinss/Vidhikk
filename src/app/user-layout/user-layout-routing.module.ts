import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GlobalSearchComponent } from '../shared/component/global-search/global-search.component';
import { PageNotFoundComponent } from '../shared/component/page-not-found/page-not-found.component';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'activity-feed',
        loadChildren: () =>
          import('../activity-feed/activity-feed.module').then(
            (m) => m.ActivityFeedModule
          ),
      },
      {
        path: 'news',
        loadChildren: () =>
          import('../news/news.module').then(
            (m) => m.NewsModule
          ),
      },
      {
        path: 'user-profile',
        loadChildren: () =>
          import('../user-profile/user-profile.module').then(
            (m) => m.UserProfileModule
          ),
      },
      {
        path: 'conference',
        loadChildren: () => import('../conference/conference.module').then(m => m.ConferenceModule)
      },
      {
        path: 'global-search',
        component: GlobalSearchComponent,
      },
      {
        path: 'contact-us',
        loadChildren: () =>
          import('../contact-us/contact-us.module').then((m) => m.ContactUsModule),
      },
      {
        path: 'advocates',
        loadChildren: () =>
          import('../advocate/advocate.module').then((m) => m.AdvocateModule),
      },
      {
        path: 'transactions',
        loadChildren: () =>
          import('../transactions/transactions.module').then((m) => m.TransactionsModule),
      },
      {
        path:'marketplace',
        loadChildren: ()=> import('../marketplace/marketplace.module').then(m=>m.MarketplaceModule)
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
export class UserLayoutRoutingModule { }
