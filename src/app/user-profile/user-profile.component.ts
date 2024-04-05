import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SignUpModel2 } from '../../app/common/signup.model';
import { userProfileModel } from '../common/user-profile.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})

export class UserProfileComponent {
  signupForm2: FormGroup;
  userEditProfileForm: FormGroup;
  userType:string ="";

  cities: any[] = [
    { value: 'indore', viewValue: 'Indore' },
    { value: 'bhopal', viewValue: 'Bhopal' },
    { value: 'surat', viewValue: 'Surat' },
  ];

  constructor(private _fb: FormBuilder, private _router: Router,) {
    this.userType = this._router.url.split('/')[1];

    this.signupForm2 = this._fb.group(new SignUpModel2);
    this.signupForm2.controls.coreCompetency.setValidators([Validators.maxLength(200)]);
    this.signupForm2.controls.mobile.setValidators([Validators.required, Validators.minLength(10)]);
    this.signupForm2.controls.email.setValidators([Validators.email]);

     this.userEditProfileForm = this._fb.group(new userProfileModel);
     this.userEditProfileForm.controls.name.setValidators([Validators.required]);
     this.userEditProfileForm.controls.city.setValidators([Validators.required]);
     this.userEditProfileForm.controls.mobile.setValidators([Validators.required,Validators.minLength(10)])
     this.userEditProfileForm.controls.email.setValidators([Validators.email]);
  }


  ngAfterViewInit() {
    if(this.userType == 'lawyer'){
      const element = document.getElementById("basic-info") as HTMLElement
      element.scrollIntoView({ behavior: "smooth", block: "end" });
      element.classList.add('box-shadow');
      const element2 = document.getElementById("basic-nav") as HTMLElement
      element2.classList.add('active-nav');
    }  
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
}
