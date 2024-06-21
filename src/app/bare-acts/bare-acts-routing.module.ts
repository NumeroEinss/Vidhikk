import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BareActsComponent } from './bare-acts.component';

const routes: Routes = [
  {
    path: '',
    component: BareActsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BareActsRoutingModule { }
