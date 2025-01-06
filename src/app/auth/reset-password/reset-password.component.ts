import { Component } from '@angular/core';
import { resetModel } from '../../common/reset-password.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApolloService } from '../../shared/services/apollo.service';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { GQLConfig } from '../../graphql.operations';
import { AuthService } from '../../shared/services/auth.service';
import { MessagingService } from '../../shared/services/messaging.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  hide: boolean = true;
  hideConfirmPassword: boolean = true;
  hideOldPassword: boolean = true;
  isUser: boolean = false;

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

  constructor(private _formBuilder: FormBuilder, private _apolloService: ApolloService,
    private _toastMessage: ToastMessageService, private _authService: AuthService) {
    this.resetPasswordForm = this._formBuilder.group(new resetModel());
    this.resetFrmCtrl['password'].setValidators([Validators.required]);
    this.resetFrmCtrl['newPassword'].setValidators([Validators.required]);
    this.resetFrmCtrl['confirmPassword'].setValidators([
      Validators.required,
    ]);
    // this.resetFrmCtrl['question'].setValidators([Validators.required]);
    // this.resetFrmCtrl['answer'].setValidators([Validators.required]);
  }

  get resetFrmCtrl() {
    return this.resetPasswordForm.controls;
  }

  resetPassword() {
    let userData = sessionStorage.getItem('userData');
    let parsedData = userData ? JSON.parse(userData) : {};
    let data = {
      phoneNumber: parsedData.primaryPhoneNumber,
      oldPassword: this.resetPasswordForm.controls.password.value,
      password: this.resetPasswordForm.controls.newPassword.value,
      confirmPassword: this.resetPasswordForm.controls.confirmPassword.value,
      userType: parsedData.userType
    };
    this._apolloService.mutate(GQLConfig.resetLoginPassword, data).subscribe(resObj => {
      if (resObj.data != null) {
        if (resObj.data.resetLoginPassword.status == 200) {
          this._toastMessage.success(resObj.data.resetLoginPassword.message);
          this._authService.logout();
        }
        else {
          this._toastMessage.error(resObj.data.resetLoginPassword.message);
        }
      }
    })
  }
}
