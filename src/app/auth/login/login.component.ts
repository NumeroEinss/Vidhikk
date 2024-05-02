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
import { ApolloService } from '../../shared/services/apollo.service';

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

  selectedUserType: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _toastMessage: SnackAlertService,
    private _apolloService: ApolloService
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
    if (formType == 'form2') {
      if (this.loginForm2.valid) {
        let reqBody = {
          mobile: this.loginForm2.controls.mobile.value,
          password: this.loginForm2.controls.password.value,
          userType: this.selectedUserType
        }
        this._apolloService.mutate(GQLConfig.loginToMobile, reqBody).subscribe(data => {
          if (data.data != null) {
            console.log(data.data)
            if (data.data.login.status == 200) {
              this._toastMessage.message(data.data.login.message);
              if (this.loginFrmCtrl2.userType.value == "USER") {
                this._router.navigate(['/user/activity-feed']);
              }
              else if (this.loginFrmCtrl2.userType.value == "LAWYER") {
                this._router.navigate(['/lawyer/activity-feed']);
              }
              else if (this.loginFrmCtrl2.userType.value == "SELLER") {
                // this._router.navigate(['/user/activity-feed']);
                this._toastMessage.message('Please select different user !!');
              }
              else if (this.loginFrmCtrl2.userType.value == "JUDGE") {
                this._router.navigate(['/judge/activity-feed']);
              }
            }
            else {
              this._toastMessage.error(data.data.login.message);
            }
          }
        })

      }
      else {
        this._toastMessage.error('Please Fill All Fields Properly!!');
      }
    }
    else if (formType == 'form') {
      if (this.loginForm.valid) {
        let reqBody = {
          email: this.loginForm.controls.email.value,
          password: this.loginForm.controls.password.value,
          userType: this.selectedUserType
        }
        this._apolloService.mutate(GQLConfig.loginToEmail, reqBody).subscribe(data => {
          if (data.data != null) {
            if (data.data.login.status == 200) {
              this._toastMessage.message(data.data.login.message);
              if (this.loginFrmCtrl.userType.value == "USER") {
                this._router.navigate(['/user/activity-feed']);
              }
              else if (this.loginFrmCtrl.userType.value == "LAWYER") {
                this._router.navigate(['/lawyer/activity-feed']);
              }
              else if (this.loginFrmCtrl.userType.value == "SELLER") {
                // this._router.navigate(['/user/activity-feed']);
                this._toastMessage.message('Please select different user !!');
              }
              else if (this.loginFrmCtrl.userType.value == "JUDGE") {
                this._router.navigate(['/judge/activity-feed']);
              }
            }
            else {
              this._toastMessage.error(data.data.login.message);
            }
          }
        })
      }
      else {
        this._toastMessage.error('Please Fill All Fields Properly!!');
      }
    }
    else {
      this._toastMessage.error('Please Fill All Fields Properly!!');
    }
  }

  redirectToForgot() {
    this._router.navigateByUrl('/auth/forgotPassword');
  }
}
