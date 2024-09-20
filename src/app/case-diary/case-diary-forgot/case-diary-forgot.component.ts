import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { ApolloService } from '../../shared/services/apollo.service';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { GQLConfig } from '../../graphql.operations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-case-diary-forgot',
  templateUrl: './case-diary-forgot.component.html',
  styleUrl: './case-diary-forgot.component.scss',
})
export class CaseDiaryForgotComponent {
  caseDiaryForgotForm: FormGroup;
  caseDiaryForgotForm2: FormGroup;
  hide: boolean = true;
  hideConfirmPassword: boolean = true;
  isClicked: boolean = false;
  isValid: boolean = false;
  otpFieldVisible: boolean = false;

  constructor(private _formBuilder: FormBuilder, private _apolloService: ApolloService, private _toastMessage: ToastMessageService,
    private _router: Router) {
    this.caseDiaryForgotForm = this._formBuilder.group({
      email: new FormControl('', [
        Validators.email,
        Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$'),
      ]),
      otp: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6)
      ])
    });
    this.caseDiaryForgotForm2 = this._formBuilder.group({
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        this.validateConfirmPassword()
      ])
    })
  }

  sendOtp() {
    let userData = sessionStorage.getItem('userData');
    let parsedData = userData ? JSON.parse(userData) : {};
    let data = {
      lawyerId: parsedData._id,
      email: this.caseDiaryForgotForm.controls.email.value
    };
    if (this.caseDiaryForgotForm.controls.email.valid) {
      this._apolloService.mutate(GQLConfig.forgotCaseDiaryPassword, data).subscribe(respObj => {
        if (respObj.data != null) {
          if (respObj.data.forgotCaseDiaryPassword.status == 200) {
            this._toastMessage.success(respObj.data.forgotCaseDiaryPassword.message);
            this.otpFieldVisible = true;
          }
          else {
            this._toastMessage.error(respObj.data.forgotCaseDiaryPassword.message);
          }
        }
      })
    }
    else {
      this._toastMessage.error('Valid email is required !!');
    }
  }

  verifyForgotOtpPassword() {
    let data = {
      email: this.caseDiaryForgotForm.controls.email.value,
      otp: this.caseDiaryForgotForm.controls.otp.value
    };
    this._apolloService.mutate(GQLConfig.verifyForgotCaseDiaryPassword, data).subscribe(respObj => {
      if (respObj.data != null) {
        if (respObj.data.verifyForgotCaseDiaryPassword.status == 200) {
          this._toastMessage.success(respObj.data.verifyForgotCaseDiaryPassword.message);
          this.isClicked = !this.isClicked;
        }
        else {
          this._toastMessage.error(respObj.data.verifyForgotCaseDiaryPassword.message);
        }
      }
    })
  }

  setNewCaseDiaryPassword() {
    let userData = sessionStorage.getItem('userData');
    let parsedData = userData ? JSON.parse(userData) : {};
    let data = {
      lawyerId: parsedData._id,
      password: this.caseDiaryForgotForm2.controls.password.value,
      confirmPassword: this.caseDiaryForgotForm2.controls.confirmPassword.value
    };
    this._apolloService.mutate(GQLConfig.setNewCaseDiaryPassword, data).subscribe(respObj => {
      if (respObj.data != null) {
        if (respObj.data.setNewCaseDiaryPassword.status == 200) {
          this._toastMessage.success(respObj.data.setNewCaseDiaryPassword.message);
          this._router.navigate(['/lawyer/case-diary/login']);
        }
        else {
          this._toastMessage.error(respObj.data.setNewCaseDiaryPassword.message);
        }
      }
    })
  }

  isNumber(event: any) {
    return event.charCode >= 48 && event.charCode <= 57;
  }

  validateConfirmPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const passwordValid = (control.value == this.caseDiaryForgotForm2.controls.password.value);
      return !passwordValid ? { passwordMatch: true } : null;
    }
  }
}
