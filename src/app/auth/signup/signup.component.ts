import { Component, ElementRef, Inject, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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

  constructor(private _fb: FormBuilder, private _matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, private _toastMessage: SnackAlertService) {
    this.signupForm = this._fb.group(new SignUpModel());
    this.SignupFrmCtrl.mobile.setValidators([Validators.required, Validators.minLength(10)]);
    this.SignupFrmCtrl.otp.setValidators([Validators.required, Validators.minLength(6)]);

    this.signupForm2 = this._fb.group(new SignUpModel2);
    // this.signupForm2.controls.email.setValidators([Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]);
    this.signupForm2.controls.email.setValidators([Validators.email]);
    this.signupForm2.controls.coreCompetency.setValidators([Validators.minLength(150), Validators.maxLength(200)]);
    this.signupForm2.controls.password.setValidators([Validators.required, Validators.minLength(10)]);
    this.signupForm2.controls.confirmPassword.setValidators([Validators.required, this.validateConfirmPassword()])

    this.filteredField = this.signupForm2.controls.practiceField?.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.fields.slice())),
    );
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

    this.signupForm2.controls.practiceField.setValue(null);
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
    this.signupForm2.controls.practiceField.setValue(null);
  }

  private _filter(value: any): string[] {
    const filterValue = value.value.toLowerCase();

    return this.fields.filter(feilds => feilds.value.toLowerCase().includes(filterValue));
  }
}
