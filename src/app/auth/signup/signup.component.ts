import { Component, ElementRef, Inject, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators, FormControl } from '@angular/forms';
import { SignUpModel, SignUpModel2 } from '../../common/signup.model';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { SnackAlertService } from '../../shared/services/snack-alert.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { map, startWith } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  @ViewChild('otpDialog', { static: false }) otpDialog!: TemplateRef<any>;
  // @ViewChild('fieldInput') fieldInput!: ElementRef<HTMLInputElement>;
  signupForm: FormGroup;
  signupForm2: FormGroup;
  otpVerified: boolean = false;
  mobileNoEntered: boolean = false;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredField: any = [];
  displayField: any = [];

  states: any[] = [
    { value: 'Madhya Pradesh', viewValue: 'Madhya Pradesh' },
    { value: 'Uttar Pradesh', viewValue: 'Uttar Pradesh' },
    { value: 'Gujrat', viewValue: 'Gujrat' },
  ];

  cities: any[] = [
    { value: 'Madhya Pradesh', viewValue: 'Indore' },
    { value: 'Uttar Pradesh', viewValue: 'Bhopal' },
    { value: 'Gujrat', viewValue: 'Surat' },
  ];

  fields: any[] = [
    { value: 'Civil', viewValue: 'Civil' },
    { value: 'Finance', viewValue: 'Finance' },
    { value: 'Taxation', viewValue: 'Taxation' },
  ];

  queries: any[] = [
    { value: 'What is your favorite color', viewValue: 'What is your favorite color' },
    { value: 'What is your DOB', viewValue: 'What is your DOB' },
    { value: 'which is your first school', viewValue: 'which is your first school' },
  ];

  termsCondition = [
    {
      section: '1',
    },
    {
      subHeading: '1. Use of the Website',
      details: [
        '1.1. You must be at least 18 years old to use the Website. By using the Website, you represent and warrant that you are at least 18 years old.',
        '1.2. You agree to use the Website only for lawful purposes and in accordance with these Terms and all applicable laws and regulations.',
        '1.3. You may not use the Website in any manner that could disable, overburden, damage, or impair the Website or interfere with any other partys use of the Website.'
      ],
    },
    {
      subHeading: '2. Intellectual Property Rights',
      details: [
        '2.1. All content on the Website, including text, graphics, logos, images, audio clips, and software, is the property of Vidhik or its licensors and is protected by copyright and other intellectual property laws.',
        '2.2. You may not reproduce, distribute, modify, or create derivative works of any content from the Website without the prior written consent of Vidhik.',
      ],
    },
    {
      subHeading: '3. User Contributions',
      details: [
        '3.1. The Website may allow you to submit comments, feedback, or other content ("User Contributions").',
        '3.2. By submitting User Contributions, you grant Vidhik a non-exclusive, royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such User Contributions throughout the world in any media.',
        '3.3. You represent and warrant that your User Contributions do not infringe any third party&quotes rights, including intellectual property rights, and are not unlawful, defamatory, obscene, or otherwise objectionable.',
      ],
    },
    {
      subHeading: '4. Limitation of Liability',
      details: [
        '4.1. In no event shall Vidhik, its officers, directors, employees, or agents be liable to you or any third party for any indirect, consequential, incidental, special, or punitive damages arising out of or relating to your use of the Website.',
        '4.2. Vidhik shall not be liable for any loss or damage arising out of or relating to any User Contributions or third-party content posted on the Website.'
      ],
    },
    {
      subHeading: '5. Governing Law',
      details: [
        '5.1. Vidhik reserves the right to change these Terms at any time. Any changes will be effective immediately upon posting on the Website. Your continued use of the Website after the posting of revised Terms constitutes your acceptance of such changes.'
      ],
    },
    {
      subHeading: '6. Changes to Terms',
      details: [
        '6.1. You must be at least 18 years old to use the Website. By using the Website, you represent and warrant that you are at least 18 years old.',
        '6.2. You agree to use the Website only for lawful purposes and in accordance with these Terms and all applicable laws and regulations.',
        '6.3. You may not use the Website in any manner that could disable, overburden, damage, or impair the Website or interfere with any other partys use of the Website.'
      ],
    },
    {
      subHeading: '7. Contact Information',
      details: [
        '7.1. If you have any questions about these Terms, please contact us at [Contact Email]. By using the Website, you acknowledge that you have read, understood, and agree to be bound by these Terms and all applicable laws and regulations.'
      ],
    },
  ];

  privacyPolicy = [
    {
      subHeading: '1. Information We Collect',
      details: [
        '1.1. Personal Identification Information: We may collect personal identification information from users in various ways, including but not limited to when users visit our Website, register on the Website, subscribe to newsletters, respond to surveys, fill out forms, and in connection with other activities, services, features, or resources we make available on our Website. Users may be asked for, as appropriate, name, email address, phone number, and other relevant information.',
        '1.2. Non-personal Identification Information: We may collect non-personal identification information about users whenever they interact with our Website. Non-personal identification information may include the browser name, the type of computer or device, and technical information about users means of connection to our Website, such as the operating system and the Internet service providers utilized.'
      ],
    },
    {
      subHeading: '2. How We Use Collected Information',
      details: [
        '2.1. We may collect and use userspersonal information for the following purposes: To personalize user experience: We may use information in the aggregate to understand how our users as a group use the services and resources provided on our Website.To improve our Website: We continually strive to improve our Website offerings based on the information and feedback we receive from users.To send periodic emails: We may use the email address to respond to inquiries, questions, and/or other requests.'
      ],
    },
    {
      subHeading: '3. How We Protect Your Information',
      details: [
        '3.1. We adopt appropriate data collection, storage, and processing practices and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our Website.'
      ],
    },
    {
      subHeading: '4. Sharing Your Personal Information',
      details: [
        '4.1. We do not sell, trade, or rent users personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers for the purposes outlined above.'
      ],
    },
    {
      subHeading: '5. Third-Party Websites',
      details: [
        '5.1. Users may find advertising or other content on our Website that links to the sites and services of our partners, suppliers, advertisers,'
      ],
    },
  ];


  constructor(private _fb: FormBuilder, private _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, private _toastMessage: SnackAlertService) {
    this.signupForm = this._fb.group(new SignUpModel());
    this.SignupFrmCtrl.mobile.setValidators([Validators.required, Validators.minLength(10)]);
    this.SignupFrmCtrl.otp.setValidators([Validators.required, Validators.minLength(6)]);

    this.signupForm2 = this._fb.group(new SignUpModel2);
    // this.signupForm2.controls.email.setValidators([Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);
    this.signupForm2.controls.email.setValidators([Validators.email]);
    this.signupForm2.controls.coreCompetency.setValidators([Validators.maxLength(200)]);
    this.signupForm2.controls.password.setValidators([Validators.required, Validators.minLength(10)]);
    this.signupForm2.controls.confirmPassword.setValidators([Validators.required, this.validateConfirmPassword])
  }

  get SignupFrmCtrl() {
    return this.signupForm.controls;
  }

  isNumber(event: any) {
    return event.charCode >= 48 && event.charCode <= 57;
  }

  onSubmitOtp() {
    this.signupForm2.controls.mobile.patchValue(this.signupForm.controls.mobile.value);
  }

  resendOtp() {
    this._toastMessage.success('Otp Sent Successfully !!');
  }

  validateConfirmPassword(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

      const value = control.value;

      if (!value) {
        return null;
      }

      const passwordValid = control.value == this.signupForm2.controls.password.value;

      return !passwordValid ? { passwordMatch: true } : null;
    }
  }

  onOtpChange(e: any) {
    console.log(e);
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
    return this.fields.filter(feilds => feilds.value.toLowerCase().includes(filterValue));
  }
}
