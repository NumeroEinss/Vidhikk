import { Component } from '@angular/core';
import { forgotModel } from '../../common/forgot-password.model';
import {
  FormBuilder,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SnackAlertService } from '../../shared/services/snack-alert.service';
import { GQLConfig } from '../../graphql.operations';
import { ApolloService } from '../../shared/services/apollo.service';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

export interface City {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})


export class ForgotPasswordComponent {

  questionList: any[] = [
    { value: 'In what city were you born?', viewValue: 'In what city were you born?' },
    { value: 'What is your favorite color?', viewValue: 'What is your favorite color?' },
    { value: 'What is your first school name?', viewValue: 'What is your first school name?' },
  ];

  forgotPasswordForm: FormGroup;
  forgotPasswordForm1: FormGroup;
  hide: boolean = true;
  selectedIndex: number = 0;
  isMobileNoEntered: boolean = false;
  isEmailEntered: boolean = false;
  isVerified: boolean = false;
  isUser: boolean = false;

  constructor(private _formBuilder: FormBuilder, private _toastMessage: SnackAlertService, private _router: Router,
     private _apolloService: ApolloService,  private AuthService: AuthService) {
    this.forgotPasswordForm = this._formBuilder.group(new forgotModel());
    this.forgotFrmCtrl['mobile'].setValidators([
      Validators.required,
      Validators.minLength(10),
    ]);
    this.forgotFrmCtrl['otp'].setValidators([
      Validators.required,
      Validators.minLength(6),
    ]);

    this.forgotPasswordForm1 = this._formBuilder.group(new forgotModel());
    this.forgotFrmCtrl1['email'].setValidators([
      Validators.required,
      Validators.email
    ]);
    this.forgotFrmCtrl1['otp'].setValidators([
      Validators.required,
      Validators.minLength(6),
    ]);

  }

  getErrorMessage() {
    if (this.forgotPasswordForm1.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.forgotPasswordForm1.controls['email'].hasError('email')
      ? 'Not a valid email'
      : '';
  }

  get forgotFrmCtrl() {
    return this.forgotPasswordForm.controls;
  }

  get forgotFrmCtrl1() {
    return this.forgotPasswordForm1.controls;
  }


  tabSelectionChange(event: any) {
    if (event.index == 0) {
      this.forgotPasswordForm = this._formBuilder.group(new forgotModel());
      this.forgotFrmCtrl['mobile'].setValidators([
        Validators.required,
        Validators.minLength(10),
      ]);
      this.forgotFrmCtrl['otp'].setValidators([
        Validators.required,
        Validators.minLength(6),
      ]);
    } else {
      this.forgotPasswordForm1 = this._formBuilder.group(new forgotModel());
      this.forgotFrmCtrl1['email'].setValidators([
        Validators.required,
        Validators.email
      ]);
      this.forgotFrmCtrl1['otp'].setValidators([
        Validators.required,
        Validators.minLength(6),
      ]);
    }
  }

  isNumber(event: any) {
    return event.charCode >= 48 && event.charCode <= 57;
  }

  resendOtpOnMobile() {
    let reqBody = {
      mobile: this.forgotPasswordForm.controls.mobile.value
    }
    this._apolloService.mutate(GQLConfig.forgotPasswordMobile, reqBody).subscribe(data => {
      if (data.data != null) {
        if (data.data.forgotPassword.status == 200) {
          this._toastMessage.message(data.data.forgotPassword.message);
        }
        else {
          this._toastMessage.error(data.data.forgotPassword.message);
        }
      }
    })
  }

  resendOtpOnEmail(){
    let reqBody = {
      email: this.forgotPasswordForm1.controls.email.value
    }
    console.log(reqBody.email)
    this._apolloService.mutate(GQLConfig.forgotPasswordEmail, reqBody).subscribe(data => {
      if (data.data != null) {
        if (data.data.forgotPassword.status == 200) {
          this._toastMessage.message(data.data.forgotPassword.message)
        }
        else {
          this._toastMessage.error(data.data.forgotPassword.message)
        }
      }
    })
  }

  mobileForgotPassword() {
    let reqBody = {
      mobile: this.forgotPasswordForm.controls.mobile.value
    }
    this._apolloService.mutate(GQLConfig.forgotPasswordMobile, reqBody).subscribe(data => {
      if (data.data != null) {
        if (data.data.forgotPassword.status == 200) {
          this._toastMessage.message(data.data.forgotPassword.message);
        }
        else {
          this._toastMessage.error(data.data.forgotPassword.message);
        }
      }
    })
  }

  verifyMobileOtp() {
    this.AuthService.mobileNumber = this.forgotPasswordForm.controls.mobile.value;
    let reqBody = {
      mobile: this.forgotPasswordForm.controls.mobile.value,
      otp: this.forgotPasswordForm.controls.otp.value
    }
    this._apolloService.mutate(GQLConfig.forgotPasswordVerifyOtpMobile, reqBody).subscribe(data => {
      if (data.data != null) {
        if (data.data.forgotPasswordVerifyOtp.status == 200) {
          this._toastMessage.message(data.data.forgotPasswordVerifyOtp.message);
          this._router.navigate(['/auth/createPassword']);
        }
        else {
          this._toastMessage.error(data.data.forgotPasswordVerifyOtp.message);
        }
      }
    })
  }

  emailForgotPassword() {
    let reqBody = {
      email: this.forgotPasswordForm1.controls.email.value
    }
    console.log(reqBody.email)
    this._apolloService.mutate(GQLConfig.forgotPasswordEmail, reqBody).subscribe(data => {
      if (data.data != null) {
        console.log(data.data)
        if (data.data.forgotPassword.status == 200) {
          console.log(data.data.forgotPassword.status)
          this._toastMessage.message(data.data.forgotPassword.message)
        }
        else {
          console.log(data.data.forgotPassword.status)
          this._toastMessage.error(data.data.forgotPassword.message)
        }
      }
    })
  }

  verifyEmailOtp(){
    
  }
}
