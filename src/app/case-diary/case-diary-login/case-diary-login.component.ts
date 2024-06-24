import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { ApolloService } from '../../shared/services/apollo.service';
import { GQLConfig } from '../../graphql.operations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-case-diary-login',
  templateUrl: './case-diary-login.component.html',
  styleUrl: './case-diary-login.component.scss'
})
export class CaseDiaryLoginComponent {

  caseDiaryForm: FormGroup;
  hide: boolean = true;
  agreement: boolean = false;

  constructor(private _formBuilder: FormBuilder, private _toastMessage: ToastMessageService, private _apolloService: ApolloService,
    private _router: Router) {
    let userData = JSON.parse(localStorage.getItem('userData')!);
    this.caseDiaryForm = this._formBuilder.group({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(10)]),
      lawyerId: new FormControl(userData._id)
    });
    let isCaseDiaryLogin = JSON.parse(localStorage.getItem('isCaseDiaryLogin')!);
    if (isCaseDiaryLogin) {
      this._router.navigate(['lawyer/case-diary/cases']);
    }
  }

  login() {
    if (this.caseDiaryForm.valid) {
      this._apolloService.mutate(GQLConfig.caseDiaryLogin, this.caseDiaryForm.value).subscribe((data) => {
        if (data.data != null) {
          if (data.data.signIn.status == 200) {
            this._router.navigate(['lawyer/case-diary/cases']);
            localStorage.setItem('isCaseDiaryLogin', JSON.stringify(true));
          }
          else {
            this._toastMessage.error(data.data.signIn.message);
          }
        }
      })
    }
    else {
      this._toastMessage.error("Please fill all the fields !!");
    }
  }
}





