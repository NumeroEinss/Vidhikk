import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})

export class UserProfileComponent {

  editProfile: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.editProfile = new FormGroup({
      coreCompetency: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      mobile: new FormControl('', [Validators.required, Validators.minLength(10)]),
      email: new FormControl('', [Validators.required,  Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    })
  }

  ngAfterViewInit() {
    const element = document.getElementById("basic-info") as HTMLElement
    element.scrollIntoView({ behavior: "smooth", block: "center" });
    element.classList.add('box-shadow');
    const element2 = document.getElementById("basic-nav") as HTMLElement
    element2.classList.add('active-nav');
  }

  addShadow(type: any) {
    let element1 = document.getElementById("password&security") as HTMLElement;
    let element2 = document.getElementById("subscription") as HTMLElement;
    let element3 = document.getElementById("orgainization-info") as HTMLElement;
    let element4 = document.getElementById("basic-info") as HTMLElement;
    switch (type) {
      case 'password&security':
        element1.scrollIntoView({ behavior: "smooth", block: "center" });
        element1.classList.add('box-shadow');
        element1.classList.add('mb-3');
        element2.classList.remove('box-shadow');
        element3.classList.remove('box-shadow');
        element4.classList.remove('box-shadow');
        break;
      case 'subscription':
        element2.scrollIntoView({ behavior: "smooth", block: "center" });
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
        element4.scrollIntoView({ behavior: "smooth", block: "end" });
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

  get editProfileFormCtrl() {
    return this.editProfile.controls
  }
  
  isNumber(event: any) {
    return event.charCode >= 48 && event.charCode <= 57;
  }
  onOtpChange(e: any) {
    console.log(e);
  }

}
