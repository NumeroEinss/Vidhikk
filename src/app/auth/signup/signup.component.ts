import { Component, ElementRef, Inject, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { SignUpModel, LawyerSignupModel, UserSignupModel, JudgeSignupModel } from '../../common/signup.model';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { GQLConfig } from '../../graphql.operations';
import { ApolloService } from '../../shared/services/apollo.service';
import { Router } from '@angular/router';
import { NgOtpInputComponent } from 'ng-otp-input';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  @ViewChild('otpDialog', { static: false }) otpDialog!: TemplateRef<any>;
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput!: NgOtpInputComponent;

  signupForm: FormGroup;
  lawyerForm: FormGroup;
  otpVerified: boolean = false;
  mobileNoEntered: boolean = false;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredField: any = [];
  displayField: any = [];

  userType: string = "LAWYER";
  userForm: FormGroup;
  judgeForm: FormGroup;
  userImage: any;
  emailOtpVerified: boolean = false;
  otp: string = "";

  private otpChangeTimeout: any;

  cityList: any[] = [];

  allDistricts: any[] = [
    { state: 'mp', value: 'indore', viewValue: 'Indore' },
    { state: 'mp', value: 'bhopal', viewValue: 'Bhopal' },
    { state: 'up', value: 'aligarh', viewValue: 'Aligarh' },
    { state: 'up', value: 'bareli', viewValue: 'Bareli' },
    { state: 'gujrat', value: 'surat', viewValue: 'Surat' },
    { state: 'gujrat', value: 'ahmedabad', viewValue: 'Ahmedabad' },
  ];

  allCourtType: any[] = [
    { district: 'indore', value: 'district Court', viewValue: 'District Court' },
    { district: 'bhopal', value: 'civil Court', viewValue: 'Civil Court' },
    { district: 'aligarh', value: 'subordinate Court', viewValue: 'Subordinate Court' },
    { district: 'bareli', value: 'supreme Court', viewValue: 'Supreme Court' },
    { district: 'surat', value: 'district Court', viewValue: 'District Court Surat' },
    { district: 'ahmedabad', value: 'supreme Court', viewValue: 'Supreme Court' },
  ];

  allCourtName: any[] = [
    { type: 'district Court', value: 'District & Session Court', viewValue: 'District & Session Court', },
    { type: 'civil Court', value: 'District & Session Court BHOPAL', viewValue: 'District & Session Court BHOPAL', },
    { type: 'subordinate Court', value: 'Civil Court Uttar Pradesh', viewValue: 'Civil Court Uttar Pradesh' },
    { type: 'supreme Court', value: 'Subordinate Court Ahmedabad', viewValue: 'Subordinate Court Ahmedabad' },
  ];

  fields: any = [];

  queries: any[] = [
    { value: 'What is your favorite color', viewValue: 'What is your favorite color' },
    { value: 'What is your DOB', viewValue: 'What is your DOB' },
    { value: 'which is your first school', viewValue: 'which is your first school' },
  ];

  filteredDistricts: any[] = [];
  filteredCourtNames: any[] = [];
  filteredCourtTypes: any[] = [];

  constructor(private _fb: FormBuilder, private _matDialog: MatDialog, private _router: Router, private _http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any, private _toastMessage: ToastMessageService, private _apolloService: ApolloService) {
    this.signupForm = this._fb.group(new SignUpModel());
    this.SignupFrmCtrl.mobile.setValidators([Validators.required, Validators.minLength(10)]);
    this.SignupFrmCtrl.otp.setValidators([Validators.required, Validators.minLength(6)]);

    this.lawyerForm = this._fb.group(new LawyerSignupModel);
    // this.signupForm2.controls.email.setValidators([Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);
    this.lawyerForm.controls.email.setValidators([Validators.email]);
    this.lawyerForm.controls.coreCompetency.setValidators([Validators.maxLength(200)]);
    this.lawyerForm.controls.password.setValidators([Validators.required, Validators.minLength(10)]);
    this.lawyerForm.controls.confirmPassword.setValidators([Validators.required, this.validateConfirmPassword()]);

    this.userForm = this._fb.group(new UserSignupModel);
    this.userForm.controls.password.setValidators([Validators.required, Validators.minLength(10)]);
    this.userForm.controls.confirmPassword.setValidators([Validators.required, this.validateUserConfirmPassword()]);
    this.judgeForm = this._fb.group(new JudgeSignupModel);

    this.getCitiesList();
    this.getPractiscingField();
  }

  opacityStyling = { opacity: 0.1 };

  ngAfterViewInit() {
    let element = document.getElementById('modalButton') as HTMLElement;
    element.click();
  }

  get SignupFrmCtrl() {
    return this.signupForm.controls;
  }

  isNumber(event: any) {
    return event.charCode >= 48 && event.charCode <= 57;
  }

  onSubmitOtp() {
    this.lawyerForm.controls.phoneNumber.patchValue(this.signupForm.controls.mobile.value);
    this.userForm.controls.phoneNumber.patchValue(this.signupForm.controls.mobile.value);
    this.judgeForm.controls.phoneNumber.patchValue(this.signupForm.controls.mobile.value);
  }

  validateConfirmPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const passwordValid = (control.value == this.lawyerForm.controls.password.value);
      return !passwordValid ? { passwordMatch: true } : null;
    }
  }

  validateUserConfirmPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const passwordValid = (control.value == this.userForm.controls.password.value);
      return !passwordValid ? { passwordMatch: true } : null;
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.displayField.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    // this.signupForm2.controls.practiceField.setValue(null);
  }

  remove(fruit: any): void {
    const index = this.displayField.indexOf(fruit);

    if (index >= 0) {
      this.displayField.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.displayField.push(event.option.viewValue);
    // this.fieldInput.nativeElement.value = '';
    // this.signupForm2.controls.practiceField.setValue(null);
  }

  private _filter(value: any): string[] {
    const filterValue = value.value.toLowerCase();
    return this.fields.filter((feilds: { value: string; }) => feilds.value.toLowerCase().includes(filterValue));
  }

  userImageChange(event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (this.userType == "LAWYER") {
        this.lawyerForm.controls.file.patchValue(event.target.files[0]);
        this.lawyerForm.controls.fileDisplay.patchValue(e.target?.result);
      }
      else if (this.userType == "USER") {
        this.userForm.controls.file.patchValue(event.target.files[0]);
        this.userForm.controls.fileDisplay.patchValue(e.target?.result);
      }
      else if (this.userType == "JUDGE") {
        this.judgeForm.controls.file.patchValue(event.target.files[0]);
        this.judgeForm.controls.fileDisplay.patchValue(e.target?.result);
      }
    }
    reader.readAsDataURL(event.target.files[0]);
  }

  onStateChange(selectedState: string) {
    this.filteredDistricts = this.allDistricts.filter(district => district.state === selectedState);
    this.judgeFrmCtrl.currentDistrict.setValue('');
    this.judgeFrmCtrl.courtType.setValue('');
    this.judgeFrmCtrl.courtName.setValue('');
  }

  onDistrictChange(selectedDistrict: string) {
    this.filteredCourtTypes = this.allCourtType.filter(court => court.district === selectedDistrict);
    this.judgeFrmCtrl.courtType.setValue('');
    this.judgeFrmCtrl.courtName.setValue('');
  }

  onCourtTypeChange(selectedCourtType: string) {
    this.filteredCourtNames = this.allCourtName.filter(name => name.type === selectedCourtType);
    this.judgeFrmCtrl.courtName.setValue('');
  }

  get judgeFrmCtrl() {
    return this.judgeForm.controls;
  }


  //generateMobileOtpForSignup
  generateOtp() {
    let reqObj = {
      mobile: this.signupForm.controls.mobile.value
    }
    this._apolloService.mutate(GQLConfig.sendOtp, reqObj).subscribe(data => {
      if (data.data != null) {
        if (data.data.sendOtp.status == 200) {
          this._toastMessage.message(data.data.sendOtp.message);
          this.mobileNoEntered = !this.mobileNoEntered;
        }
        else {
          this._toastMessage.error(data.data.sendOtp.message);
        }
      }
    });
  }

  //verifyMobileOtpForSignup
  verifyOtp() {
    let reqObj: any = {
      mobile: this.signupForm.controls.mobile.value,
      otp: this.signupForm.controls.otp.value
    };
    this._apolloService.query(GQLConfig.verifyOtp, reqObj).subscribe((data: any) => {
      if (data.data != null) {
        if (data.data.verifyOtp.status == 200) {
          this._toastMessage.message(data.data.verifyOtp.message);
          this.otpVerified = !this.otpVerified;
          this.lawyerForm.controls.phoneNumber.patchValue(this.SignupFrmCtrl.mobile.value);
          this.userForm.controls.phoneNumber.patchValue(this.SignupFrmCtrl.mobile.value);
        }
        else {
          this._toastMessage.error(data.data.verifyOtp.message);
        }
      }
    })
  }

  //resendOtpForSignup
  resendOtp() {
    let reqObj = {
      mobile: this.signupForm.controls.mobile.value
    }
    this._apolloService.mutate(GQLConfig.sendOtp, reqObj).subscribe(data => {
      if (data.data != null) {
        if (data.data.sendOtp.status == 200) {
          this._toastMessage.message(data.data.sendOtp.message);
        }
        else {
          this._toastMessage.error(data.data.sendOtp.message);
        }
      }
    });
  }


  //sendOtpEmail
  sendOtpForEmail() {
    let data = {}
    if (this.userType == "USER") {
      data = {
        email: this.userForm.controls.email.value,
        phoneNumber: this.userForm.controls.phoneNumber.value
      };
    }
    else if (this.userType == "LAWYER") {
      data = {
        email: this.lawyerForm.controls.email.value,
        phoneNumber: this.lawyerForm.controls.phoneNumber.value
      };
    }
    this._apolloService.mutate(GQLConfig.sendOtpEmail, data).subscribe(objEmailOtp => {
      if (objEmailOtp.data != null) {
        if (objEmailOtp.data.sendOtp.status == 200) {
          let el = document.getElementById('otpModalButton') as HTMLElement;
          el.click();
          this._toastMessage.message(objEmailOtp.data.sendOtp.message);
          this.ngOtpInput.setValue('');
        }
        else {
          this._toastMessage.error(objEmailOtp.data.sendOtp.message);
        }
      }
    })
  }

  onOtpChange(e: any) {
    clearTimeout(this.otpChangeTimeout);
    this.otpChangeTimeout = setTimeout(() => {
      if (e.length == 6 && !this.emailOtpVerified) {
        let data = {};
        if (this.userType == "USER") {
          data = {
            email: this.userForm.controls.email.value,
            mobile: this.userForm.controls.phoneNumber.value,
            otp: e
          };
        } else if (this.userType == "LAWYER") {
          data = {
            email: this.lawyerForm.controls.email.value,
            mobile: this.lawyerForm.controls.phoneNumber.value,
            otp: e
          };
        }
        this._apolloService.mutate(GQLConfig.verifyOtpEmail, data).subscribe(objEmailOtp => {
          if (objEmailOtp.data != null) {
            if (objEmailOtp.data.verifyOtp.status == 200) {
              this.emailOtpVerified = true;
              let el = document.getElementById('closeOtpModalButton') as HTMLElement;
              el.click();
              this._toastMessage.success(objEmailOtp.data.verifyOtp.message);
              this.ngOtpInput.setValue('');
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
    if (this.userType == "USER") {
      data = {
        email: this.userForm.controls.email.value,
        phoneNumber: this.userForm.controls.phoneNumber.value
      };
    }
    else if (this.userType == "LAWYER") {
      data = {
        email: this.lawyerForm.controls.email.value,
        phoneNumber: this.lawyerForm.controls.phoneNumber.value
      };
    }
    this._apolloService.mutate(GQLConfig.sendOtpEmail, data).subscribe(objEmailOtp => {
      if (objEmailOtp.data != null) {
        if (objEmailOtp.data.sendOtp.status == 200) {
          this._toastMessage.message(objEmailOtp.data.sendOtp.message);
          this.ngOtpInput.setValue('');
        }
        else {
          this._toastMessage.error(objEmailOtp.data.sendOtp.message);
        }
      }
    })
  }

  userSignUp() {
    if (!this.userForm.valid) {
      this._toastMessage.error("Please fill all the fields !!");
    }
    else if (!this.emailOtpVerified) {
      this._toastMessage.error("Please verify your email !!");
    }
    else {
      let reqObj = {
        userType: this.userType,
        name: this.userForm.controls.name.value,
        mobile: this.userForm.controls.phoneNumber.value,
        isPrimaryContactWhatsapp: this.userForm.controls.isPrimaryContactWhatsapp.value,
        secondaryContact: this.userForm.controls.secondaryContact.value,
        isSecondaryContactWhatsapp: this.userForm.controls.isSecondaryContactWhatsapp.value,
        address: this.userForm.controls.address.value,
        city: this.userForm.controls.city.value,
        state: this.userForm.controls.state.value,
        email: this.userForm.controls.email.value,
        password: this.userForm.controls.password.value,
        confirmPassword: this.userForm.controls.confirmPassword.value,
      }
      this._apolloService.mutate(GQLConfig.createUser, reqObj).subscribe(data => {
        if (data.data != null) {
          if (data.data.createUser.status == 200) {
            this._toastMessage.success(data.data.createUser.message + '. Login to proceed further');
            setTimeout(() => { this._router.navigateByUrl('/auth/login'); }, 2000);
          }
          else {
            this._toastMessage.error(data.data.createUser.message);
          }
        }
      })
    }
  }

  async lawyerSignup() {
    // accountVerificationButton
    if (this.lawyerForm.value.file == "") {
      this._toastMessage.error("Please add profile image !!");
    }
    else if (!this.lawyerForm.valid) {
      this._toastMessage.error("Please Fill all the fields !!");
    }
    else if (!this.emailOtpVerified) {
      this._toastMessage.error("Please verify your email !!");
    }
    else {
      let status: string = "";

      let isLawyerVerified: Boolean = await this.isLawyerVerified(this.lawyerForm.controls.licenseNo.value.trim());

      isLawyerVerified === true ? status = "Approved" : status = "";

      const mutation = {
        "query": "mutation ($input: AdvocateProfile!, $file: Upload) { createLawyers(input: $input, file: $file) { status message data } }",
        "variables": {
          "input": {
            "userType": this.userType,
            "lawyerName": this.lawyerForm.controls.name.value,
            "fatherName": this.lawyerForm.controls.fatherName.value,
            "orgainization": this.lawyerForm.controls.orgainization.value,
            "primaryContact": this.lawyerForm.controls.phoneNumber.value,
            "isPrimaryContactWhatsapp": this.lawyerForm.controls.isPrimaryContactWhatsapp.value,
            "isPrimaryMobileDisplay": this.lawyerForm.controls.isPrimaryContactVisible.value,
            "secondaryContact": this.lawyerForm.controls.secondaryContact.value,
            "isSecondaryContactWhatsapp": this.lawyerForm.controls.isSecondaryContactWhatsapp.value,
            "isSecondaryMobileDisplay": this.lawyerForm.controls.isSecondaryContactVisible.value,
            "city": this.lawyerForm.controls.city.value,
            "state": this.lawyerForm.controls.state.value,
            "email": this.lawyerForm.controls.email.value,
            "password": this.lawyerForm.controls.password.value,
            "confirmPassword": this.lawyerForm.controls.confirmPassword.value,
            "barLicenseNumber": this.lawyerForm.controls.licenseNo.value,
            "stateBar": this.lawyerForm.controls.stateBar.value,
            "practiceYear": parseInt(this.lawyerForm.controls.practiceYear.value),
            "coreCompetency": this.lawyerForm.controls.coreCompetency.value,
            "practicingCourt": this.lawyerForm.controls.courtName.value,
            "practicingField": this.lawyerForm.controls.practiceField.value,
            "isEmailDisplay": false,
            "barAddress": this.lawyerForm.controls.barAddress.value,
            "isBarAddressDisplay": this.lawyerForm.controls.isAddressVisible.value,
            "status": status
          },
          "file": null
        }
      }

      this._apolloService.upload(mutation, this.lawyerForm.controls.file.value, "0").subscribe(objRes => {
        if (objRes.data != null) {
          this._toastMessage.success(objRes.data.createLawyers.message);
          if (isLawyerVerified == false) {
            let btn = document.getElementById('accountVerificationButton') as HTMLElement;
            btn.click();
          }
          if (isLawyerVerified == true) {
            this._router.navigate(['/auth/login']);
          }
        }
        else {
          this._toastMessage.error(objRes.data.createLawyers.message);
        }
      })
    }
  }

  async isLawyerVerified(barLiscenceNo: string): Promise<Boolean> {
    let isVerified: any = false;
    let reqObj = {
      enrollmentNo: barLiscenceNo
    }
    let respObj = await lastValueFrom(this._apolloService.post('/lawyer/verify', reqObj));
    if (respObj.status == "success") {
      isVerified = true;
    }
    return isVerified;
  }

  citySelectionChange(e: any, formName: string) {
    let stateObj = this.cityList.find(x => x.name == e.value);
    switch (formName) {
      case 'userForm':
        this.userForm.controls.state.patchValue(stateObj.state);
        break;
      case 'lawyerForm':
        this.lawyerForm.controls.state.patchValue(stateObj.state);
        break;
      case 'judgeForm':
        this.judgeForm.controls.state.patchValue(stateObj.state);
        break;
      default:
        break;
    }
  }

  getCitiesList() {
    this._http.get('assets/JSON/cities.json').subscribe((data: any) => {
      this.cityList = data;
    })
  }

  userTypeChange() {
    this.lawyerForm.reset();
    this.lawyerForm = this._fb.group(new LawyerSignupModel());
    this.userForm.reset();
    this.userForm = this._fb.group(new UserSignupModel());
    this.judgeForm.reset();
    this.judgeForm = this._fb.group(new JudgeSignupModel());
    this.emailOtpVerified = false;
    this.onSubmitOtp();
  }

  getPractiscingField() {
    this._http.get('assets/JSON/practiscing_field.json').subscribe({
      next: (data) => {
        this.fields = data;
      },
      error: (error) => { this._toastMessage.error(error) }
    })
  }

  getImage(image: any) {
    return window.location.host + image;
  }

  ngOnDestroy() {
    let element = document.getElementById('dismissModal') as HTMLElement;
    element.click();
  }
}
