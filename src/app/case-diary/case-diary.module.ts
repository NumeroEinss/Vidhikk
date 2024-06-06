import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseDiaryRoutingModule } from './case-diary-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CaseDiaryLoginComponent } from './case-diary-login/case-diary-login.component';
import { CaseDiarySignupComponent } from './case-diary-signup/case-diary-signup.component';
import { CaseDiaryForgotComponent } from './case-diary-forgot/case-diary-forgot.component';
import { CaseDiaryResetPasswordComponent } from './case-diary-reset-password/case-diary-reset-password.component';
import { CaseDiaryListComponent } from './case-diary-list/case-diary-list.component';
import { CreateCaseDiaryComponent } from './create-case-diary/create-case-diary.component';
import { CreateSubDiaryComponent } from './create-sub-diary/create-sub-diary.component';
import { ViewApplicationComponent } from './view-application/view-application.component';
import { caseDiaryGuard } from '../core/guard/case-diary.guard';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { EditCaseDiaryComponent } from './edit-case-diary/edit-case-diary.component';


@NgModule({
  declarations: [
    CaseDiaryLoginComponent,
    CaseDiarySignupComponent,
    CaseDiaryForgotComponent,
    CaseDiaryResetPasswordComponent,
    CaseDiaryListComponent,
    CreateCaseDiaryComponent,
    CreateSubDiaryComponent,
    ViewApplicationComponent,
    EditCaseDiaryComponent],

  imports: [
    CommonModule,
    CaseDiaryRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule
  ],
  providers: [caseDiaryGuard,provideNativeDateAdapter()]
})
export class CaseDiaryModule { }