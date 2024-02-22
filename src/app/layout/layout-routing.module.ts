import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../shared/component/page-not-found/page-not-found.component';
import { GlobalSearchComponent } from '../shared/component/global-search/global-search.component';
import { CalendarComponent } from '../calendar/calendar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'case-law',
        loadChildren: () =>
          import('../case-law/case-law.module').then((m) => m.CaseLawModule),
      },
      {
        path: 'activity-feed',
        loadChildren: () =>
          import('../activity-feed/activity-feed.module').then(
            (m) => m.ActivityFeedModule
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
        path: 'case-diary',
        loadChildren: () =>
          import('../case-diary/case-diary.module').then(
            (m) => m.CaseDiaryModule
          ),
      },
      {
        path: 'members',
        loadChildren: () =>
          import('../members/members.module').then((m) => m.MembersModule),
      },
      {
        path: 'chat-room',
        loadChildren: () =>
          import('../chat-room/chat-room.module').then((m) => m.ChatRoomModule),
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
        path: 'calendar',
        loadChildren: () =>
          import('../calendar/calendar.module').then((m) => m.CalendarsModule),
      },
      {
        path: '**',
        component: PageNotFoundComponent,
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
