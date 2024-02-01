import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignUpModel, SignUpModel2 } from '../../common/signup.model';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  @ViewChild('otpDialog', { static: false }) otpDialog!: TemplateRef<any>;

  signupForm: FormGroup;
  signupForm2: FormGroup;
  otpVerified: boolean = false;
  mobileNoEntered: boolean = false;

  states: any[] = [
    { value: 'Madhya Pradesh', viewValue: 'Madhya Pradesh' },
    { value: 'Uttar Pradesh', viewValue: 'Uttar Pradesh' },
    { value: 'Gujrat', viewValue: 'Gujrat' },
  ];

  cities: any[] = [
    { value: 'Madhya Pradesh', viewValue: 'Indore' },
    { value: 'Uttar Pradesh', viewValue: 'Bhopal' },
    { value: 'Gujrat', viewValue: 'Surat' },
  ];

  fields: any[] = [
    { value: 'Civil', viewValue: 'Civil' },
    { value: 'Finance', viewValue: 'Finance' },
    { value: 'Taxation', viewValue: 'Taxation' },
  ];

  queries: any[] = [
    { value: 'What is your favorite color', viewValue: 'What is your favorite color' },
    { value: 'What is your DOB', viewValue: 'What is your DOB' },
    { value: 'which is your first school', viewValue: 'which is your first school' },
  ];

  constructor(private _fb: FormBuilder, private _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.signupForm = this._fb.group(new SignUpModel());
    this.SignupFrmCtrl.mobile.setValidators([Validators.required, Validators.minLength(10)]);
    this.SignupFrmCtrl.otp.setValidators([Validators.required, Validators.minLength(6)]);

    this.signupForm2 = this._fb.group(new SignUpModel2);
    this.signupForm2.controls.email.setValidators([Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);
  }

  get SignupFrmCtrl() {
    return this.signupForm.controls;
  }

  isNumber(event: any) {
    return event.charCode >= 48 && event.charCode <= 57;
  }

  onSubmitOtp() {
    this.signupForm2.controls.mobile.patchValue(this.signupForm.controls.mobile.value);
  }
}
