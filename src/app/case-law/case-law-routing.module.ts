import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseLawListComponent } from './case-law-list/case-law-list.component';
import { PageNotFoundComponent } from '../shared/component/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cases',
    pathMatch: 'full'
  },
  {
    path: 'cases',
    component: CaseLawListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseLawRoutingModule { }
