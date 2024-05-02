import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forgotModel2 } from '../../common/forgot-password.model';
import { SnackAlertService } from '../../shared/services/snack-alert.service';
import { GQLConfig } from '../../graphql.operations';
import { ApolloService } from '../../shared/services/apollo.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-new-password',
  templateUrl: './create-new-password.component.html',
  styleUrl: './create-new-password.component.scss',
})
export class CreateNewPasswordComponent {
  setNewPasswordForm: FormGroup;
  hide: boolean = true;
  hideConfirmPassword: boolean = true;

  mobileNumber: string = '';
  emailId: string = '';
  
  constructor(private _formBuilder: FormBuilder, private _toastMessage: SnackAlertService, private _router: Router,
    private _apolloService: ApolloService, private _route: ActivatedRoute) {
    this.setNewPasswordForm = this._formBuilder.group(new forgotModel2());
    this.setNewPasswordFrmCtrl['setPassword'].setValidators([Validators.required]);
    this.setNewPasswordFrmCtrl['confirmPassword'].setValidators([Validators.required]);
  }

  get setNewPasswordFrmCtrl() {
    return this.setNewPasswordForm.controls;
  }

  // resetPassword() {
  //   let reqBody = {
  //     mobile: this.mobileNumber,
  //     password: this.setNewPasswordForm.controls.setPassword.value,
  //     confirmPassword: this.setNewPasswordForm.controls.confirmPassword.value
  //   }
  //   console.log(reqBody)
  //   this._apolloService.mutate(GQLConfig.resetPasswordMobile, reqBody).subscribe(data => {
  //     if (data.data != null) {
  //       if (data.data.resetPassword.status == 200) {
  //         this._toastMessage.message(data.data.resetPassword.message);
  //       }
  //       else {
  //         this._toastMessage.message(data.data.resetPassword.message)
  //       }
  //     }
  //   })
  // }

  resetPassword() {
    this._route.queryParams.subscribe((params: Params) => {
      if (this.mobileNumber = params['mobile']) {
        let reqBody = {
          mobile: this.mobileNumber,
          password: this.setNewPasswordForm.controls.setPassword.value,
          confirmPassword: this.setNewPasswordForm.controls.confirmPassword.value
        }
        console.log(reqBody)
        this._apolloService.mutate(GQLConfig.resetPasswordMobile, reqBody).subscribe(data => {
          if (data.data != null) {
            if (data.data.resetPassword.status == 200) {
              this._toastMessage.message(data.data.resetPassword.message);
            }
            else {
              this._toastMessage.message(data.data.resetPassword.message)
            }
          }
        })
      }
    });
    this._route.queryParams.subscribe((params: Params) => {
      if (this.emailId = params['email']) {
        let reqBody = {
          email: this.emailId,
          password: this.setNewPasswordForm.controls.setPassword.value,
          confirmPassword: this.setNewPasswordForm.controls.confirmPassword.value
        }
        console.log(reqBody)
        this._apolloService.mutate(GQLConfig.resetPasswordEmail, reqBody).subscribe(data => {
          if (data.data != null) {
            if (data.data.resetPassword.status == 200) {
              this._toastMessage.message(data.data.resetPassword.message);
            }
            else {
              this._toastMessage.message(data.data.resetPassword.message)
            }
          }
        })
      }
    })
  }
}
