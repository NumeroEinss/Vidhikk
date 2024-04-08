import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../shared/component/page-not-found/page-not-found.component';
import { GlobalSearchComponent } from '../shared/component/global-search/global-search.component';

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
        path: 'case-law',
        loadChildren: () =>
          import('../case-law/case-law.module').then(
            (m) => m.CaseLawModule
          ),
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
        path: 'user-profile',
        loadChildren: () =>
          import('../user-profile/user-profile.module').then((m) => m.UserProfileModule),
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
export class JudgeLayoutRoutingModule { }
