import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../shared/component/page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'case-law',
                loadChildren: () => import('../case-law/case-law.module').then(m => m.CaseLawModule)
            },
            {
                path: 'activity-feed',
                loadChildren: () => import('../activity-feed/activity-feed.module').then(m => m.ActivityFeedModule)
            }
        ]
    },
    {
        path: '**',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
