import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-case-diary-signup',
  templateUrl: './case-diary-signup.component.html',
  styleUrl: './case-diary-signup.component.scss',
})
export class CaseDiarySignupComponent {
  caseDiarySignUpForm: FormGroup;
  hide: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(private _formBuilder: FormBuilder) {
    this.caseDiarySignUpForm = this._formBuilder.group({
      username: new FormControl('', [Validators.required]),
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
