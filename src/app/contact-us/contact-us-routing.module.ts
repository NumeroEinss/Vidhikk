import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us.component';
import { ContactUsDetailComponent } from './contact-us-detail/contact-us-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ContactUsComponent,
  },
  {
    path: 'contact-us-detail',
    component: ContactUsDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactUsRoutingModule { }
