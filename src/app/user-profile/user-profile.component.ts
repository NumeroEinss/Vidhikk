import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { JudgeSignupModel, LawyerSignupModel } from '../../app/common/signup.model';
import { userProfileModel } from '../common/user-profile.model';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})

export class UserProfileComponent {
  signupForm2: FormGroup;
  userEditProfileForm: FormGroup;
  userType: string = "";

  cities: any[] = [
    { value: 'indore', viewValue: 'Indore' },
    { value: 'bhopal', viewValue: 'Bhopal' },
    { value: 'surat', viewValue: 'Surat' },
  ];

  states: any[] = [
    { value: 'Madhya Pradesh', viewValue: 'Madhya Pradesh' },
    { value: 'Uttar Pradesh', viewValue: 'Uttar Pradesh' },
    { value: 'Gujrat', viewValue: 'Gujrat' },
  ];

  districts: any[] = [
    { value: 'Indore', viewValue: 'Indore' },
    { value: 'Bhopal', viewValue: 'Bhopal' },
    { value: 'Gwalior', viewValue: 'Gwalior' },
  ];

  courtType: any[] = [
    { value: 'District Court', viewValue: 'District Court' },
    { value: 'Supreme Court', viewValue: 'Supreme Court' },
    { value: 'Civil Court', viewValue: 'Civil Court' },
  ];

  courtName: any[] = [
    {
      value: 'District & Session Court INDORE',
      viewValue: 'District & Session Court INDORE',
    },
    { value: 'Civil Court GOHAD', viewValue: 'Civil Court GOHAD' },
    {
      value: 'District & Session Court BHOPAL',
      viewValue: 'District & Session Court BHOPAL',
    },
  ];

  constructor(private _fb: FormBuilder, private _router: Router, private _authService: AuthService) {
    this.userType = this._router.url.split('/')[1];

    this.signupForm2 = this._fb.group(new LawyerSignupModel);
    this.signupForm2.controls.coreCompetency.setValidators([Validators.maxLength(200)]);
    this.signupForm2.controls.phoneNumber.setValidators([Validators.required, Validators.minLength(10)]);
    this.signupForm2.controls.email.setValidators([Validators.email]);

    this.userEditProfileForm = this._fb.group(new userProfileModel);
    this.userEditFrmCtrl.name.setValidators([Validators.required]);
    this.userEditFrmCtrl.city.setValidators([Validators.required]);
    this.userEditFrmCtrl.mobile.setValidators([Validators.required, Validators.minLength(10)])
    this.userEditFrmCtrl.email.setValidators([Validators.email]);
    this.userEditFrmCtrl.state.setValidators([Validators.required]);
    this.userEditFrmCtrl.district.setValidators([Validators.required]);
    this.userEditFrmCtrl.courtType.setValidators([Validators.required]);
    this.userEditFrmCtrl.courtName.setValidators([Validators.required]);
  }


  ngAfterViewInit() {
    if (this.userType == 'lawyer') {
      const element = document.getElementById("basic-info") as HTMLElement
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      element.classList.add('box-shadow');
      const element2 = document.getElementById("basic-nav") as HTMLElement
      element2.classList.add('active-nav');
    }
  }

  get userEditFrmCtrl() {
    return this.userEditProfileForm.controls;
  }

  addShadow(type: any) {
    let element1 = document.getElementById("password&security") as HTMLElement;
    let element2 = document.getElementById("subscription") as HTMLElement;
    let element3 = document.getElementById("orgainization-info") as HTMLElement;
    let element4 = document.getElementById("basic-info") as HTMLElement;
    switch (type) {
      case 'password&security':
        element1.scrollIntoView({ behavior: "smooth", block: "start" });
        element1.classList.add('box-shadow');
        element1.classList.add('mb-3');
        element2.classList.remove('box-shadow');
        element3.classList.remove('box-shadow');
        element4.classList.remove('box-shadow');
        break;
      case 'subscription':
        element2.scrollIntoView({ behavior: "smooth", block: "start" });
        element2.classList.add('box-shadow');
        element1.classList.remove('box-shadow');
        element3.classList.remove('box-shadow');
        element4.classList.remove('box-shadow');
        break;
      case 'orgainization-info':
        element3.scrollIntoView({ behavior: "smooth", block: "center" });
        element3.classList.add('box-shadow');
        element2.classList.remove('box-shadow');
        element1.classList.remove('box-shadow');
        element4.classList.remove('box-shadow');
        break;
      case 'basic-info':
        element4.scrollIntoView({ behavior: "smooth", block: "center" });
        element4.classList.add('box-shadow');
        element2.classList.remove('box-shadow');
        element3.classList.remove('box-shadow');
        element1.classList.remove('box-shadow');
        break;
    }
  }

  addStyling(type: any) {
    let element1 = document.getElementById("password-nav") as HTMLElement;
    let element2 = document.getElementById("subscription-nav") as HTMLElement;
    let element3 = document.getElementById("organization-nav") as HTMLElement;
    let element4 = document.getElementById("basic-nav") as HTMLElement;
    switch (type) {
      case 'password-nav':
        element1.classList.add('active-nav');
        element2.classList.remove('active-nav');
        element3.classList.remove('active-nav');
        element4.classList.remove('active-nav');
        break;
      case 'subscription-nav':
        element2.classList.add('active-nav');
        element1.classList.remove('active-nav');
        element3.classList.remove('active-nav');
        element4.classList.remove('active-nav');
        break;
      case 'organization-nav':
        element3.classList.add('active-nav');
        element2.classList.remove('active-nav');
        element1.classList.remove('active-nav');
        element4.classList.remove('active-nav');
        break;
      case 'basic-nav':
        element4.classList.add('active-nav');
        element2.classList.remove('active-nav');
        element3.classList.remove('active-nav');
        element1.classList.remove('active-nav');
        break;
    }
  }

  isNumber(event: any) {
    return event.charCode >= 48 && event.charCode <= 57;
  }

  onOtpChange(e: any) {
    console.log(e);
  }

  logout() {
    this._authService.logout();
  }
}
