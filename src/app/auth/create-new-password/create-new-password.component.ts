import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forgotModel2 } from '../../common/forgot-password.model';
import { SnackAlertService } from '../../shared/services/snack-alert.service';
import { GQLConfig } from '../../graphql.operations';
import { ApolloService } from '../../shared/services/apollo.service';
import { AuthService } from '../../shared/services/auth.service';
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

  constructor(private _formBuilder: FormBuilder, private _toastMessage: SnackAlertService, private _router: Router, 
     private _apolloService: ApolloService, private AuthService: AuthService) {
    this.setNewPasswordForm = this._formBuilder.group(new forgotModel2());
    this.forgotFrmCtrl2['setPassword'].setValidators([Validators.required]);
    this.forgotFrmCtrl2['confirmPassword'].setValidators([Validators.required]);
  }

  get forgotFrmCtrl2() {
    return this.setNewPasswordForm.controls;
  }

  
  resetPassword(){
    let reqBody = {
      password : this.setNewPasswordForm.controls.setPassword.value,
      confirmPassword : this.setNewPasswordForm.controls.confirmPassword.value
    }
    this._apolloService.mutate(GQLConfig.resetPasswordMobile, reqBody).subscribe(data=>{
      if(data.data !=null){
        if(data.data.resetPassword.status == 200){
          this._toastMessage.message(data.data.resetPassword.message);
          this._router.navigate(['/auth/resetPassword']);
        }
        else{
          this._toastMessage.message(data.data.resetPassword.message)
        }
      }
    })
  }
}
