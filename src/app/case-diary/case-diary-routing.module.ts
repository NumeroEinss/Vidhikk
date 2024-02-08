import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseDiaryLoginComponent } from './case-diary-login/case-diary-login.component';
import { CaseDiarySignupComponent } from './case-diary-signup/case-diary-signup.component';
import { CaseDiaryForgotComponent } from './case-diary-forgot/case-diary-forgot.component';
import { CaseDiaryResetPasswordComponent } from './case-diary-reset-password/case-diary-reset-password.component';
import { CaseDiaryListComponent } from './case-diary-list/case-diary-list.component';
import { CreateCaseDiaryComponent } from './create-case-diary/create-case-diary.component';
import { CreateSubDiaryComponent } from './create-sub-diary/create-sub-diary.component';
import { ViewApplicationComponent } from './view-application/view-application.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: CaseDiaryLoginComponent,
  },
  {
    path: 'signup',
    component: CaseDiarySignupComponent,
  },
  {
    path: 'forget-password',
    component: CaseDiaryForgotComponent,
  },
  {
    path: 'reset-password',
    component: CaseDiaryResetPasswordComponent,
  },
  {
    path: 'cases',
    component: CaseDiaryListComponent,
  },
  {
    path: 'create',
    component: CreateCaseDiaryComponent,
  },
  {
    path: 'create-sub-diary',
    component: CreateSubDiaryComponent,
  },
  {
    path: 'view-application/:id',
    component: ViewApplicationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaseDiaryRoutingModule {}
