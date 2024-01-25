import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseDiaryRoutingModule } from './case-diary-routing.module';
import { CaseDiaryComponent } from './case-diary.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CaseDiaryLoginComponent } from './case-diary-login/case-diary-login.component';
import { CaseDiarySignupComponent } from './case-diary-signup/case-diary-signup.component';
import { CaseDiaryForgotComponent } from './case-diary-forgot/case-diary-forgot.component';
import { CaseDiaryResetPasswordComponent } from './case-diary-reset-password/case-diary-reset-password.component';
import { CaseDiaryListComponent } from './case-diary-list/case-diary-list.component';
import { CreateCaseDiaryComponent } from './create-case-diary/create-case-diary.component';



@NgModule({
  declarations: [
    CaseDiaryComponent,
    CaseDiaryLoginComponent,
    CaseDiarySignupComponent,
    CaseDiaryForgotComponent,
    CaseDiaryResetPasswordComponent,
    CaseDiaryListComponent,
    CreateCaseDiaryComponent],

  imports: [
    CommonModule,
    CaseDiaryRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CaseDiaryModule { }
