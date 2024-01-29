import { Component } from '@angular/core';
import { forgotModel } from '../../common/forgot-password.model';
import {
  FormBuilder,
  FormControlName,
  FormGroup,
  Validators,
} from '@angular/forms';

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
    { value: 'Indore', viewValue: 'Indore' },
    { value: 'Bhopal', viewValue: 'Bhopal' },
    { value: 'Surat', viewValue: 'Surat' },
  ];

  forgotPasswordForm: FormGroup;
  forgotPasswordForm1: FormGroup;
  hide: boolean = true;
  selectedIndex: number = 0;
  isOTPSent: boolean = false;
  isVerified: boolean = false;


  constructor(private _formBuilder: FormBuilder) {
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

}
