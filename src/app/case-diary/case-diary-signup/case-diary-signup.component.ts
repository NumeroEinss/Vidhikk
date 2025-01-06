import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ApolloService } from '../../shared/services/apollo.service';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { GQLConfig } from '../../graphql.operations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-case-diary-signup',
  templateUrl: './case-diary-signup.component.html',
  styleUrl: './case-diary-signup.component.scss',
})
export class CaseDiarySignupComponent {
  caseDiarySignUpForm: FormGroup;
  hide: boolean = true;
  hideConfirmPassword: boolean = true;

  constructor(private _formBuilder: FormBuilder, private _apolloService: ApolloService, private _toastMessage: ToastMessageService,
    private _router: Router) {
    this.caseDiarySignUpForm = this._formBuilder.group({
      userName: new FormControl('', [Validators.required]),
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

  ngAfterViewInit() {
    let element = document.getElementById('companyPolicyButton') as HTMLElement;
    element.click();
  }

  register() {
    if (this.caseDiarySignUpForm.valid) {
      let userData = sessionStorage.getItem('userData');
      let parsedData = userData ? JSON.parse(userData) : {};
      let data = {
        lawyerId: parsedData._id,
        userName: this.caseDiarySignUpForm.controls.userName.value,
        password: this.caseDiarySignUpForm.controls.password.value,
        confirmPassword: this.caseDiarySignUpForm.controls.confirmPassword.value
      };
      this._apolloService.mutate(GQLConfig.caseDiarySignUp, data).subscribe(objRes => {
        if (objRes.data != null) {
          if (objRes.data.signUp.status == 200) {
            this._toastMessage.success(objRes.data.signUp.message);
            this._router.navigate(['lawyer/case-diary/login']);
          }
          else{
            this._toastMessage.error(objRes.data.signUp.message);
          }
        }
      })
    }
    else{
      this._toastMessage.error("Please fill all fields !!");
    }
  }
}
