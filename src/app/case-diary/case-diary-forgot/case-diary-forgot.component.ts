import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-case-diary-forgot',
  templateUrl: './case-diary-forgot.component.html',
  styleUrl: './case-diary-forgot.component.scss',
})
export class CaseDiaryForgotComponent {
  caseDiaryForgotForm: FormGroup;
  hide: boolean = true;
  hideConfirmPassword: boolean = true;
  isClicked: boolean = false;
  isValid: boolean = false;

  constructor(private _formBuilder: FormBuilder) {
    this.caseDiaryForgotForm = this._formBuilder.group({
      email: new FormControl('', [
        Validators.email,
        Validators.pattern('^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }
}
