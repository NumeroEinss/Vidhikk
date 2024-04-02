import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { PageNotFoundComponent } from './shared/component/page-not-found/page-not-found.component';
import { LawyerLayoutComponent } from './lawyer-layout/lawyer-layout.component';
import { CreateNewPasswordComponent } from './auth/create-new-password/create-new-password.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { AuthGuard } from './core/guard/auth.guard';
import { UserLayoutComponent } from './user-layout/user-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'auth/signup',
    component: SignupComponent
  },
  {
    path: 'auth/forgotPassword',
    component: ForgotPasswordComponent,
  },
  {
    path: 'auth/createPassword',
    component: CreateNewPasswordComponent,
  },
  {
    path: 'auth/resetPassword',
    component: ResetPasswordComponent
  },
  {
    path: 'lawyer',
    component: LawyerLayoutComponent,
    loadChildren: () => import('./lawyer-layout/lawyer-layout.module').then(m => m.LawyerLayoutModule),
    // canActivate: [AuthGuard]
  },
  {
    path: 'user',
    component: UserLayoutComponent,
    loadChildren: () => import('./user-layout/user-layout.module').then(m => m.UserLayoutModule),
    // canActivate: [AuthGuard]
  },
  // {
  //   path: 'seller',
  //   component: LawyerLayoutComponent,
  //   loadChildren: () => import('./lawyer-Layout/lawyer-layout.module').then(m => m.LawyerLayoutModule),
  //   // canActivate: [AuthGuard]
  // },
  // {
  //   path: 'judge',
  //   component: LawyerLayoutComponent,
  //   loadChildren: () => import('./lawyer-Layout/lawyer-layout.module').then(m => m.LawyerLayoutModule),
  //   // canActivate: [AuthGuard]
  // },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
