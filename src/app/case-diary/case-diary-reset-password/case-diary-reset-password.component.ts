import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ApolloService } from '../../shared/services/apollo.service';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { Router } from '@angular/router';
import { GQLConfig } from '../../graphql.operations';

@Component({
  selector: 'app-case-diary-reset-password',
  templateUrl: './case-diary-reset-password.component.html',
  styleUrl: './case-diary-reset-password.component.scss',
})
export class CaseDiaryResetPasswordComponent {
  caseDiaryresetPasswordForm: FormGroup;
  hide: boolean = true;
  hideOldPassword: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(private _formBuilder: FormBuilder, private _apolloService: ApolloService, private _toastMessage: ToastMessageService,
    private _router: Router) {
    this.caseDiaryresetPasswordForm = this._formBuilder.group({
      oldPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        this.validateConfirmPassword()
      ]),
    });
  }

  resetPassword() {
    let userData = sessionStorage.getItem('userData');
    let parsedData = userData ? JSON.parse(userData) : {};
    let data = {
      lawyerId: parsedData._id,
      oldPassword: this.caseDiaryresetPasswordForm.controls.oldPassword.value,
      password: this.caseDiaryresetPasswordForm.controls.password.value,
      confirmPassword: this.caseDiaryresetPasswordForm.controls.confirmPassword.value
    };
    if (this.caseDiaryresetPasswordForm.valid) {
      this._apolloService.mutate(GQLConfig.resetCaseDiaryPassword, data).subscribe(respObj => {
        if (respObj.data != null) {
          if (respObj.data.resetCaseDiaryPassword.status == 200) {
            this._toastMessage.success(respObj.data.resetCaseDiaryPassword.message);
            this._router.navigate(['/lawyer/case-diary/login']);
          }
          else {
            this._toastMessage.error(respObj.data.resetCaseDiaryPassword.message);
          }
        }
      })
    }
    else {
      this._toastMessage.error("All fields are required !!");
    }
  }

  validateConfirmPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const passwordValid = (control.value == this.caseDiaryresetPasswordForm.controls.password.value);
      return !passwordValid ? { passwordMatch: true } : null;
    }
  }
}
