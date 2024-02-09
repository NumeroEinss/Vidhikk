import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { CreateCaseDiaryModel } from '../../common/create-case-diary-model.model';

@Component({
  selector: 'app-create-case-diary',
  templateUrl: './create-case-diary.component.html',
  styleUrl: './create-case-diary.component.scss',
})
export class CreateCaseDiaryComponent {
  createCaseDiaryForm: FormGroup;

  courtNameList: any[] = [
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

  stages: any[] = [
    { value: 'Civil', viewValue: 'Civil' },
    { value: 'Finance', viewValue: 'Finance' },
    { value: 'Taxation', viewValue: 'Taxation' },
  ];

  cities: any[] = [
    { value: 'Indore', viewValue: 'Indore' },
    { value: 'Bhopal', viewValue: 'Bhopal' },
    { value: 'Mumbai', viewValue: 'Mumbai' },
  ];

  applicationType: any[] = [
    { value: 'Civil', viewValue: 'Civil' },
    { value: 'Finance', viewValue: 'Finance' },
    { value: 'Taxation', viewValue: 'Taxation' },
  ];

  applicationSection: any[] = [
    { value: 'Civil', viewValue: 'Civil' },
    { value: 'Finance', viewValue: 'Finance' },
    { value: 'Taxation', viewValue: 'Taxation' },
  ];

  constructor(private _formBuilder: FormBuilder) {
    this.createCaseDiaryForm = this._formBuilder.group(
      new CreateCaseDiaryModel()
    );
    this.createCaseDiaryFrmCtrl['registrationDate'].setValidators([
      Validators.required,
    ]);
    this.createCaseDiaryFrmCtrl['applicantName'].setValidators([
      Validators.required,
    ]);
    this.createCaseDiaryFrmCtrl['courtName'].setValidators([
      Validators.required,
    ]);
    this.createCaseDiaryFrmCtrl['respondentName'].setValidators([
      Validators.required,
    ]);
    this.createCaseDiaryFrmCtrl['hearingDate'].setValidators([
      Validators.required,
    ]);
    this.createCaseDiaryFrmCtrl['stage'].setValidators([Validators.required]);
    this.createCaseDiaryFrmCtrl['applicantType'].setValidators([
      Validators.required,
    ]);
    this.createCaseDiaryFrmCtrl['city'].setValidators([Validators.required]);
    this.createCaseDiaryFrmCtrl['applicationSection'].setValidators([
      Validators.required,
    ]);
    this.createCaseDiaryFrmCtrl['reason'].setValidators([Validators.required]);
  }

  get createCaseDiaryFrmCtrl() {
    return this.createCaseDiaryForm.controls;
  }
}
