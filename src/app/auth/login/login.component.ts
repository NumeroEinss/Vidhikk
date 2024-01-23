import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  loginForm2: FormGroup;
  hide: boolean = true;
  selectedIndex: number = 0;

  constructor(private _formBuilder: FormBuilder) {
    this.loginForm = this._formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
    this.loginForm2 = this._formBuilder.group({
      mobile: new FormControl(null, [Validators.required, Validators.pattern("[0-9 ]{10}")]),
      password: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

  getErrorMessage() {
    if (this.loginForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  get loginFrmCtrl() {
    return this.loginForm.controls;
  }

  tabSelectionChange(event: any) {
    if (event.index == 0) {
      this.loginForm2 = this._formBuilder.group({
        mobile: new FormControl('', [Validators.required, Validators.pattern("[0-9 ]{10}")]),
        password: new FormControl('', [Validators.required, Validators.minLength(10)])
      })
    }
    else {
      this.loginForm = this._formBuilder.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(10)])
      })
    }
  }

  isNumber(event: any) {
    return event.charCode >= 48 && event.charCode <= 57;
  }
}
