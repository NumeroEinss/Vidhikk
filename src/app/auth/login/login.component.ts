import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SnackAlertService } from '../../shared/services/snack-alert.service';
import { GQLConfig } from '../../graphql.operations';
import { AuthService } from '../../shared/services/auth.service';

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
    private _toastMessage: SnackAlertService,
    private _authService: AuthService
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
    if (localStorage.getItem('vidhikToken')) {
      let userDataString = localStorage.getItem('userData');
      let userData: any;
      if (userDataString !== null) {
        userData = JSON.parse(userDataString);
      }
      if (userData == '' || userData == undefined) {
        this._router.navigate(['/auth/login']);
      }
      else if (userData.userType == "USER") {
        this._router.navigate(['/user/activity-feed']);
      }
      else if (userData.userType == "LAWYER") {
        this._router.navigate(['/lawyer/activity-feed']);
      }
      else if (userData.userType == "SELLER") {
        // this._router.navigate(['/user/activity-feed']);
        this._toastMessage.message('Please select different user !!');
      }
      else if (userData.userType == "JUDGE") {
        this._router.navigate(['/judge/activity-feed']);
      }
    }
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
        this._authService.login(GQLConfig.loginWithEmail, this.loginForm.value, this.loginFrmCtrl.userType.value);
      }
      else {
        this._toastMessage.error('Please Fill All Fields Properly!!');
      }
    }
    else if (formType == 'form2') {
      if (this.loginForm2.valid) {
        this._authService.login(GQLConfig.loginWithMobile, this.loginForm2.value, this.loginFrmCtrl2.userType.value);
      }
      else {
        this._toastMessage.error('Please Fill All Fields Properly!!');
      }
    }
  }

  forgotPassword(formType: string) {
    if (formType == 'form') {
      if (this.loginFrmCtrl.userType.value == '') {
        this._toastMessage.error('Please Select User Type !!');
      }
      else {
        let extras = {
          userType: this.loginFrmCtrl.userType.value
        }
        this._router.navigate(["/auth/forgotPassword"], { state: extras });
      }
    }
    else if (formType == 'form2') {
      if (this.loginFrmCtrl2.userType.value == '') {
        this._toastMessage.error('Please Select User Type !!');
      }
      else {
        let extras = {
          userType: this.loginFrmCtrl2.userType.value
        }
        this._router.navigate(["/auth/forgotPassword"], { state: extras });
      }
    }
  }
}
