import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseDiaryLoginComponent } from './case-diary-login/case-diary-login.component';
import { CaseDiarySignupComponent } from './case-diary-signup/case-diary-signup.component';
import { CaseDiaryForgotComponent } from './case-diary-forgot/case-diary-forgot.component';
import { CaseDiaryResetPasswordComponent } from './case-diary-reset-password/case-diary-reset-password.component';
import { CaseDiaryListComponent } from './case-diary-list/case-diary-list.component';
import { CreateCaseDiaryComponent } from './create-case-diary/create-case-diary.component';


const routes: Routes = [
  {
    path: '',
    component: CaseDiaryLoginComponent
  },
  {
    path: 'case-diary-signup',
    component: CaseDiarySignupComponent
  },
  {
    path: 'case-diary-forgot',
    component: CaseDiaryForgotComponent
  },
  {
    path: 'case-diary-reset-password',
    component: CaseDiaryResetPasswordComponent
  },
  {
    path: 'case-diary-list',
    component: CaseDiaryListComponent
  },
  {
    path: 'create-case-diary',
    component: CreateCaseDiaryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaseDiaryRoutingModule { }
