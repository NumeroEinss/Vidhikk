import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { forgotModel2} from '../../common/forgot-password.model';


@Component({
  selector: 'app-create-new-password',
  templateUrl: './create-new-password.component.html',
  styleUrl: './create-new-password.component.scss'
})

export class CreateNewPasswordComponent {
  setNewPassword:FormGroup;
  hide: boolean = true;


constructor(private _formBuilder: FormBuilder) {

  this.setNewPassword = this._formBuilder.group(new forgotModel2());
  this.forgotFrmCtrl2['setPassword'].setValidators([Validators.required,]);
  this.forgotFrmCtrl2['confirmPassword'].setValidators([Validators.required]);
}


  get forgotFrmCtrl2() {
    return this.setNewPassword.controls;
  }
}
