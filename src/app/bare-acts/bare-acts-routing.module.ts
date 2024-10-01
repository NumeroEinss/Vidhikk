import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BareActsComponent } from './bare-acts.component';
import { BareActsDetailComponent } from './bare-acts-detail/bare-acts-detail.component';

const routes: Routes = [
  {
    path: '',
    component: BareActsComponent
  },
  {
    path: 'view/:id',
    component: BareActsDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BareActsRoutingModule { }
