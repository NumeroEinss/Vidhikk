import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { forgotModel2 } from '../../common/forgot-password.model';
import { SnackAlertService } from '../../shared/services/snack-alert.service';
import { GQLConfig } from '../../graphql.operations';
import { ApolloService } from '../../shared/services/apollo.service';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-new-password',
  templateUrl: './create-new-password.component.html',
  styleUrl: './create-new-password.component.scss',
})
export class CreateNewPasswordComponent {
  setNewPasswordForm: FormGroup;
  hide: boolean = true;
  hideConfirmPassword: boolean = true;
  routerState: any;

  constructor(private _formBuilder: FormBuilder, private _toastMessage: SnackAlertService, private _router: Router,
    private _apolloService: ApolloService, private AuthService: AuthService,) {
    this.setNewPasswordForm = this._formBuilder.group(new forgotModel2());
    this.setNewPasswordFrmCtrl.setPassword.setValidators([Validators.required,Validators.minLength(10)]);
    this.setNewPasswordFrmCtrl.confirmPassword.setValidators([Validators.required, this.validateConfirmPassword()]);
    this.routerState = this._router.getCurrentNavigation()?.extras.state;
    if (this.routerState == undefined) {
      this._router.navigateByUrl('auth/forgotPassword');
    }
  }

  get setNewPasswordFrmCtrl() {
    return this.setNewPasswordForm.controls;
  }


  resetPassword() {
    let reqBody = {};
    let query: any;
    if (this.routerState.method == "mobile") {
      reqBody = {
        password: this.setNewPasswordForm.controls.setPassword.value,
        confirmPassword: this.setNewPasswordForm.controls.confirmPassword.value,
        mobile: this.routerState.mobile
      }
      query = GQLConfig.resetPasswordMobile;
    }
    else if (this.routerState.method == "email") {
      reqBody = {
        password: this.setNewPasswordForm.controls.setPassword.value,
        confirmPassword: this.setNewPasswordForm.controls.confirmPassword.value,
        email: this.routerState.email
      }
      query = GQLConfig.resetPasswordEmail;
    }
    this._apolloService.mutate(query, reqBody).subscribe(data => {
      if (data.data != null) {
        if (data.data.resetPassword.status == 200) {
          this._toastMessage.message(data.data.resetPassword.message);
          this._router.navigate(['/auth/login']);
        }
        else {
          this._toastMessage.message(data.data.resetPassword.message)
        }
      }
    })
  }

  validateConfirmPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const passwordValid = (control.value == this.setNewPasswordForm.controls.setPassword.value);
      return !passwordValid ? { passwordMatch: true } : null;
    }
  }
}
