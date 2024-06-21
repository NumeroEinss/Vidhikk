import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CreateCaseDiaryModel } from '../../common/create-case-diary-model.model';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { ApolloService } from '../../shared/services/apollo.service';
import { GQLConfig } from '../../graphql.operations';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TemplateService } from '../../shared/services/template.service';

@Component({
  selector: 'app-create-case-diary',
  templateUrl: './create-case-diary.component.html',
  styleUrl: './create-case-diary.component.scss',
})
export class CreateCaseDiaryComponent {

  createCaseDiaryForm: FormGroup;
  routerState: any;

  courtNameList: any[] = [
    {
      value: 'District & Session Court INDORE',
      viewValue: 'District & Session Court INDORE',
    },
    {
      value: 'Civil Court GOHAD',
      viewValue: 'Civil Court GOHAD'
    },
    {
      value: 'District & Session Court BHOPAL',
      viewValue: 'District & Session Court BHOPAL',
    },
  ];

  stages: any[] = [];

  cityList: any[] = [];

  representingList = [
    { value: 'Applicant', viewValue: 'Applicant' },
    { value: 'Respondent ', viewValue: 'Respondent ' },
  ];

  today: Date = new Date();

  constructor(private _formBuilder: FormBuilder, private _toastMessage: ToastMessageService, private _apolloService: ApolloService,
    private _router: Router, private _http: HttpClient, private _templateService: TemplateService) {
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
    // this.createCaseDiaryFrmCtrl['nextHearingDate'].setValidators([
    //   Validators.required,
    // ]);
    this.createCaseDiaryFrmCtrl['caseName'].setValidators([Validators.required]);
    this.createCaseDiaryFrmCtrl['city'].setValidators([Validators.required]);
    this.getCitiesList();

  }

  get createCaseDiaryFrmCtrl() {
    return this.createCaseDiaryForm.controls;
  }

  getCitiesList() {
    this._http.get('assets/JSON/cities.json').subscribe((data: any) => {
      this.cityList = data;
    })
  }

  createCaseDiary() {
    if (this.createCaseDiaryForm.valid) {
      const userData = localStorage.getItem('userData');
      let parsedData = userData ? JSON.parse(userData) : {};
      let data = {
        lawyerId: parsedData._id,
        registrationDate: this.createCaseDiaryForm.controls.registrationDate.value,
        courtName: this.createCaseDiaryForm.controls.courtName.value,
        caseNumber: parseInt(this.createCaseDiaryForm.controls.caseNumber.value),
        caseName: this.createCaseDiaryForm.controls.caseName.value,
        caseStage: this.createCaseDiaryForm.controls.caseStage.value,
        city: this.createCaseDiaryForm.controls.city.value,
        applicantName: this.createCaseDiaryForm.controls.applicantName.value,
        respondentName: this.createCaseDiaryForm.controls.respondentName.value,
        applicationType: this.createCaseDiaryForm.controls.applicationType.value,
        applicationSection: this.createCaseDiaryForm.controls.applicationSection.value,
        nextHearingDate: this.createCaseDiaryForm.controls.nextHearingDate.value,
        lawyreasonForAbsent: this.createCaseDiaryForm.controls.lawyreasonForAbsent.value,
        representing:this.createCaseDiaryForm.controls.representing.value
      }
      this._apolloService.mutate(GQLConfig.createCaseDiary, data).subscribe((objRes) => {
        if (objRes.data != null) {
          if (objRes.data.createCaseDiary.status == 200) {
            this._toastMessage.success(objRes.data.createCaseDiary.message);
            this._router.navigate(['/lawyer/case-diary/cases'], { state: { diaryType: 'caseDiary' } });
          }
          else {
            this._toastMessage.error(objRes.data.createCaseDiary.message);
          }
        }
      })
    }
    else {
      this._toastMessage.error("All fields are required !!");
    }
  }

  resetForm() {
    this.createCaseDiaryForm.reset();
    this.createCaseDiaryForm = this._formBuilder.group(
      new CreateCaseDiaryModel()
    );
  }
}
