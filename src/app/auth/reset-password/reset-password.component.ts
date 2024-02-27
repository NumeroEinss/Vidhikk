import { Component } from '@angular/core';
import { resetModel } from '../../common/reset-password.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  resetPassword: FormGroup;
  hide: boolean = true;
  hideConfirmPassword: boolean = true;
  hideOldPassword: boolean = true;

  question: any[] = [
    {
      value: 'What is your favorite color',
      viewValue: 'What is your favorite color',
    },
    { value: 'What is your DOB', viewValue: 'What is your DOB' },
    {
      value: 'which is your first school',
      viewValue: 'which is your first school',
    },
  ];

  constructor(private _formBuilder: FormBuilder) {
    this.resetPassword = this._formBuilder.group(new resetModel());
    this.resetFrmCtrl['oldPassword'].setValidators([Validators.required]);
    this.resetFrmCtrl['setNewPassword'].setValidators([Validators.required]);
    this.resetFrmCtrl['confirmNewPassword'].setValidators([
      Validators.required,
    ]);
    this.resetFrmCtrl['question'].setValidators([Validators.required]);
    this.resetFrmCtrl['answer'].setValidators([Validators.required]);
  }

  get resetFrmCtrl() {
    return this.resetPassword.controls;
  }
}
