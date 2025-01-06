import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseLawListComponent } from './case-law-list/case-law-list.component';
import { CaseLawDetailComponent } from './case-law-detail/case-law-detail.component';
import { SavedCaseLawDetailComponent } from './saved-case-law-detail/saved-case-law-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'cases',
    pathMatch: 'full',
  },
  {
    path: 'cases',
    component: CaseLawListComponent,
  },
  {
    path: 'cases/view',
    component: CaseLawDetailComponent,
  },
  {
    path: 'savedCases/view',
    component: SavedCaseLawDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaseLawRoutingModule { }
