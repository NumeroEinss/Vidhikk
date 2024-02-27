import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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

  constructor(private _formBuilder: FormBuilder) {
    this.caseDiaryresetPasswordForm = this._formBuilder.group({
      oldPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      confirmNewPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }
}
