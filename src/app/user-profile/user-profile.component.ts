import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LawyerSignupModel } from '../../app/common/signup.model';
import { userProfileModel } from '../common/user-profile.model';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { imageUrl } from '../graphql.module';
import { ApolloService } from '../shared/services/apollo.service';
import { ToastMessageService } from '../shared/services/snack-alert.service';
import { lastValueFrom, Subject, takeUntil } from 'rxjs';
import { GQLConfig } from '../graphql.operations';
import { NgOtpInputComponent } from 'ng-otp-input';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})

export class UserProfileComponent {
  @ViewChild('emailOtpInput', { static: false }) emailOtpInput!: NgOtpInputComponent;
  @ViewChild('mobileOtpInput', { static: false }) mobileOtpInput!: NgOtpInputComponent;

  lawyerEditProfileForm: FormGroup;
  userEditProfileForm: FormGroup;
  userType: string = "";
  userData: any;
  displayImage: any = "";
  userImage: string = "";
  mobileOtpVerified: boolean = false;
  mobileOtp: string = "";
  emailOtpVerified: boolean = false;

  cities: any[] = [];

  states: any[] = [];

  districts: any[] = [];

  courtType: any[] = [];

  courtName: any[] = [];

  private otpChangeTimeout: any;
  private mobileOtpChangeTimeout: any;

  onDestroy$: Subject<void> = new Subject();

  constructor(private _fb: FormBuilder, private _router: Router, private _authService: AuthService,
    private _apolloService: ApolloService, private _toastMessage: ToastMessageService) {
    this.userType = this._router.url.split('/')[1];

    this.lawyerEditProfileForm = this._fb.group(new LawyerSignupModel);
    this.lawyerEditProfileForm.controls.coreCompetency.setValidators([Validators.maxLength(200)]);
    this.lawyerEditProfileForm.controls.phoneNumber.setValidators([Validators.required, Validators.minLength(10)]);
    this.lawyerEditProfileForm.controls.email.setValidators([Validators.email]);

    this.userEditProfileForm = this._fb.group(new userProfileModel);
    this.userEditFrmCtrl.name.setValidators([Validators.required]);
    this.userEditFrmCtrl.city.setValidators([Validators.required]);
    this.userEditFrmCtrl.mobile.setValidators([Validators.required, Validators.minLength(10)])
    this.userEditFrmCtrl.email.setValidators([Validators.email]);
    this.userEditFrmCtrl.state.setValidators([Validators.required]);
    this.userEditFrmCtrl.district.setValidators([Validators.required]);
    this.userEditFrmCtrl.courtType.setValidators([Validators.required]);
    this.userEditFrmCtrl.courtName.setValidators([Validators.required]);

    this.userData = JSON.parse(localStorage.getItem('userData')!);
    this._authService.profileImageSubject.asObservable()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(data => {
        this.displayImage = imageUrl() + data;
      });
  }


  ngAfterViewInit() {
    if (this.userType == 'lawyer') {
      const element = document.getElementById("basic-info") as HTMLElement
      // element.scrollIntoView({ behavior: "smooth", block: "end" });
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

  logout() {
    this._authService.logout();
  }

  userImageChange(event: any) {
    const reader = new FileReader();
    reader.onload = async (e) => {
      if (this.userType == "lawyer") {
        this.userImage = event.target.files[0];
        let uploaded = await this.uploadImage();
        if (uploaded == true) {
          this.displayImage = e.target?.result;
        }
      }
      else if (this.userType == "user") {
        this.userImage = event.target.files[0];
        let uploaded = await this.uploadImage();
        if (uploaded == true) {
          this.displayImage = e.target?.result;
        }
      }
      else if (this.userType == "judge") {
        this.userImage = event.target.files[0];
        let uploaded = await this.uploadImage();
        if (uploaded == true) {
          this.displayImage = e.target?.result;
        }
      }
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  async uploadImage(): Promise<Boolean> {
    let mutation = {
      "query": "mutation ($input: AdvocateProfile!, $file: Upload) { updateProfilePicture(input: $input, file: $file) { status message data } }",
      "variables": {
        "input": {
          "userType": "LAWYER",
          "lawyerId": this.userData._id
        },
        "file": null
      }
    }

    try {
      let objRes: any = await lastValueFrom(this._apolloService.upload(mutation, this.userImage, "0"));
      if (objRes.data) {
        this._toastMessage.success(objRes.data.updateProfilePicture.message);
        this._authService.updateProfile(objRes.data.updateProfilePicture.data)
        return true;
      } else {
        this._toastMessage.error(objRes.data.updateProfilePicture.message);
        return false;
      }
    } catch (error: any) {
      this._toastMessage.error('Error uploading image');
      console.log(error, 'lhngbf')
      return false;
    }
  }

  patchUserDetail() {
    let userData = JSON.parse(localStorage.getItem('userData')!);
    this.lawyerEditProfileForm.controls.email.patchValue(userData.email);
    this.lawyerEditProfileForm.controls.coreCompetency.patchValue(userData.coreCompetency);
    this.lawyerEditProfileForm.controls.phoneNumber.patchValue(userData.primaryPhoneNumber);
    this.mobileOtpVerified = true;
    this.emailOtpVerified = true;
  }

  mobileNumberChanged() {
    this.mobileOtpVerified = false;
  }

  //generateMobileOtpForSignup
  generateOtp() {
    let reqObj = {
      mobile: this.lawyerEditProfileForm.controls.phoneNumber.value
    }
    this._apolloService.mutate(GQLConfig.sendOtp, reqObj).subscribe(data => {
      if (data.data != null) {
        if (data.data.sendOtp.status == 200) {
          this._toastMessage.message(data.data.sendOtp.message);
          this.mobileOtpInput.setValue('');
        }
        else {
          this._toastMessage.error(data.data.sendOtp.message);
        }
      }
    });
  }

  onMobileOtpChange(e: string) {
    clearTimeout(this.mobileOtpChangeTimeout);
    this.mobileOtpChangeTimeout = setTimeout(() => {
      if (e.length == 6) {
        let data = {};
        if (this.userType == "user") {
          data = {
            email: this.userEditProfileForm.controls.email.value,
            mobile: this.userEditProfileForm.controls.phoneNumber.value,
            otp: e
          };
        } else if (this.userType == "lawyer") {
          data = {
            email: this.lawyerEditProfileForm.controls.email.value,
            mobile: this.lawyerEditProfileForm.controls.phoneNumber.value,
            otp: e
          };
        }
        this.verifyOtp(data);
      }
    }, 300); // 300ms delay
  }

  //resendOtpForSignup
  resendOtp(mobile: any) {
    let reqObj = {
      mobile: mobile
    }
    this._apolloService.mutate(GQLConfig.sendOtp, reqObj).subscribe(data => {
      if (data.data != null) {
        if (data.data.sendOtp.status == 200) {
          this._toastMessage.message(data.data.sendOtp.message);
          this.mobileOtpInput.setValue('');
        }
        else {
          this._toastMessage.error(data.data.sendOtp.message);
        }
      }
    });
  }

  //verifyMobileOtpForEditProfile
  verifyOtp(reqObj: any) {
    this._apolloService.query(GQLConfig.verifyOtp, reqObj).subscribe((data: any) => {
      if (data.data != null) {
        if (data.data.verifyOtp.status == 200) {
          this._toastMessage.message(data.data.verifyOtp.message);
          this.mobileOtpVerified = !this.mobileOtpVerified;
          let btn = document.getElementById('closeMobile') as HTMLElement;
          btn.click();
          let btn2 = document.getElementById('openLawyerEditModal') as HTMLElement;
          btn2.click();
          this.mobileOtpInput.setValue('');
        }
        else {
          this._toastMessage.error(data.data.verifyOtp.message);
        }
      }
    })
  }

  emailChanged() {
    this.emailOtpVerified = false;
  }

  //sendOtpEmail
  sendOtpForEmail() {
    let data = {}
    if (this.userType == "user") {
      data = {
        email: this.userEditProfileForm.controls.email.value,
        phoneNumber: this.userEditProfileForm.controls.phoneNumber.value
      };
    }
    else if (this.userType == "lawyer") {
      data = {
        email: this.lawyerEditProfileForm.controls.email.value,
        phoneNumber: this.lawyerEditProfileForm.controls.phoneNumber.value
      };
    }
    this._apolloService.mutate(GQLConfig.sendOtpEmail, data).subscribe(objEmailOtp => {
      if (objEmailOtp.data != null) {
        if (objEmailOtp.data.sendOtp.status == 200) {
          this._toastMessage.message(objEmailOtp.data.sendOtp.message);
          this.emailOtpInput.setValue('');
        }
        else {
          this._toastMessage.error(objEmailOtp.data.sendOtp.message);
        }
      }
    })
  }

  onEmailOtpChange(e: any) {
    clearTimeout(this.otpChangeTimeout);
    this.otpChangeTimeout = setTimeout(() => {
      if (e.length == 6) {
        let data = {};
        if (this.userType == "user") {
          data = {
            email: this.userEditProfileForm.controls.email.value,
            mobile: this.userEditProfileForm.controls.phoneNumber.value,
            otp: e
          };
        } else if (this.userType == "lawyer") {
          data = {
            email: this.lawyerEditProfileForm.controls.email.value,
            mobile: this.lawyerEditProfileForm.controls.phoneNumber.value,
            otp: e
          };
        }
        this._apolloService.mutate(GQLConfig.verifyOtpEmail, data).subscribe(objEmailOtp => {
          if (objEmailOtp.data != null) {
            if (objEmailOtp.data.verifyOtp.status == 200) {
              let el = document.getElementById('closeEmail') as HTMLElement;
              el.click();
              this._toastMessage.success(objEmailOtp.data.verifyOtp.message);
              this.emailOtpInput.setValue('');
              this.emailOtpVerified = true;
              let btn2 = document.getElementById('openLawyerEditModal') as HTMLElement;
              btn2.click();
            } else {
              this._toastMessage.error(objEmailOtp.data.verifyOtp.message);
            }
          }
        });
      }
    }, 300); // 300ms delay
  }

  resendEmailOtp() {
    let data = {}
    if (this.userType == "user") {
      data = {
        email: this.userEditProfileForm.controls.email.value,
        phoneNumber: this.userEditProfileForm.controls.phoneNumber.value
      };
    }
    else if (this.userType == "lawyer") {
      data = {
        email: this.lawyerEditProfileForm.controls.email.value,
        phoneNumber: this.lawyerEditProfileForm.controls.phoneNumber.value
      };
    }
    this._apolloService.mutate(GQLConfig.sendOtpEmail, data).subscribe(objEmailOtp => {
      if (objEmailOtp.data != null) {
        if (objEmailOtp.data.sendOtp.status == 200) {
          this._toastMessage.message(objEmailOtp.data.sendOtp.message);
          this.emailOtpInput.setValue('');
        }
        else {
          this._toastMessage.error(objEmailOtp.data.sendOtp.message);
        }
      }
    })
  }

  updateProfile() {
    let data = {}
    if (this.userType == 'lawyer') {
      data = {
        lawyerId: this.userData._id,
        email: this.lawyerEditProfileForm.controls.email.value,
        primaryContact: this.lawyerEditProfileForm.controls.phoneNumber.value,
        coreCompetency: this.lawyerEditProfileForm.controls.coreCompetency.value
      }
    }
    else if (this.userType == 'user') {
      data = {}
    }
    this._apolloService.mutate(GQLConfig.updateLawyerProfile, data).subscribe(objRes => {
      if (objRes.data != null) {
        if (objRes.data.updateLawyerProfile.status == 200) {
          this._toastMessage.message(objRes.data.updateLawyerProfile.message);
        }
        else {
          this._toastMessage.error(objRes.data.updateLawyerProfile.message);
        }
      }
    })
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}

