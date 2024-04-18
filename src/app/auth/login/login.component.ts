import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SnackAlertService } from '../../shared/services/snack-alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  loginForm2: FormGroup;
  hide: boolean = true;
  selectedIndex: number = 0;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _toastMessage: SnackAlertService
  ) {
    this.loginForm = this._formBuilder.group({
      userType: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
    this.loginForm2 = this._formBuilder.group({
      userType: new FormControl('', [Validators.required]),
      mobile: new FormControl(null, [
        Validators.required,
        Validators.pattern('[0-9 ]{10}'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  getErrorMessage() {
    if (this.loginForm.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }

    return this.loginForm.controls['email'].hasError('email')
      ? 'Not a valid email'
      : '';
  }

  get loginFrmCtrl() {
    return this.loginForm.controls;
  }

  get loginFrmCtrl2() {
    return this.loginForm2.controls;
  }

  tabSelectionChange(event: any) {
    if (event.index == 0) {
      this.loginForm2 = this._formBuilder.group({
        userType: new FormControl('', [Validators.required]),
        mobile: new FormControl(null, [
          Validators.required,
          Validators.pattern('[0-9 ]{10}'),
        ]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
        ]),
      });
    }
    else {
      this.loginForm = this._formBuilder.group({
        userType: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
        ]),
      });
    }
  }

  isNumber(event: any) {
    return event.charCode >= 48 && event.charCode <= 57;
  }

  login(formType: string) {
    if (formType == 'form') {
      if (this.loginForm.valid) {
        if (this.loginFrmCtrl.userType.value == "user") {
          this._router.navigate(['/user/activity-feed']);
        }
        else if (this.loginFrmCtrl.userType.value == "lawyer") {
          this._router.navigate(['/lawyer/activity-feed']);
        }
        else if (this.loginFrmCtrl.userType.value == "seller") {
          // this._router.navigate(['/user/activity-feed']);
          this._toastMessage.message('Please select different user !!');
        }
        else if (this.loginFrmCtrl.userType.value == "judge") {
          this._router.navigate(['/judge/activity-feed']);
        }
      }
      else {
        this._toastMessage.error('Please Fill All Fields Properly!!');
      }
    }
    else if (formType == 'form2') {
      if (this.loginForm2.valid) {

        if (this.loginFrmCtrl2.userType.value == "user") {
          this._router.navigate(['/user/activity-feed']);
        }

        else if (this.loginFrmCtrl2.userType.value == "lawyer") {
          this._router.navigate(['/lawyer/activity-feed']); ''
        }

        else if (this.loginFrmCtrl2.userType.value == "seller") {
          // this._router.navigate(['/user/activity-feed']);
          this._toastMessage.message('Please select different user !!');
        }

        else if (this.loginFrmCtrl2.userType.value == "judge") {
          this._router.navigate(['/judge/activity-feed']);
        }
      }
      else {
        this._toastMessage.error('Please Fill All Fields Properly!!');
      }
    }
    else {
      this._toastMessage.error('Please Fill All Fields Properly!!');
    }
  }
}
