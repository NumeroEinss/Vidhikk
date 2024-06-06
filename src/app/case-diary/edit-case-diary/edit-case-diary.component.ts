import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateCaseDiaryModel } from '../../common/create-case-diary-model.model';
import { GQLConfig } from '../../graphql.operations';
import { ApolloService } from '../../shared/services/apollo.service';
import { ToastMessageService } from '../../shared/services/snack-alert.service';

@Component({
  selector: 'app-edit-case-diary',
  templateUrl: './edit-case-diary.component.html',
  styleUrl: './edit-case-diary.component.scss'
})
export class EditCaseDiaryComponent {
  editCaseDiaryForm: FormGroup;
  routerState: any;

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

  constructor(private _formBuilder: FormBuilder, private _toastMessage: ToastMessageService, private _apolloService: ApolloService,
    private _router: Router) {
    this.editCaseDiaryForm = this._formBuilder.group(
      new CreateCaseDiaryModel()
    );
    this.editCaseDiaryFrmCtrl['registrationDate'].setValidators([
      Validators.required,
    ]);
    this.editCaseDiaryFrmCtrl['applicantName'].setValidators([
      Validators.required,
    ]);
    this.editCaseDiaryFrmCtrl['courtName'].setValidators([
      Validators.required,
    ]);
    this.editCaseDiaryFrmCtrl['respondentName'].setValidators([
      Validators.required,
    ]);
    this.editCaseDiaryFrmCtrl['nextHearingDate'].setValidators([
      Validators.required,
    ]);
    this.editCaseDiaryFrmCtrl['caseName'].setValidators([Validators.required]);
    this.editCaseDiaryFrmCtrl['caseStage'].setValidators([Validators.required]);
    this.editCaseDiaryFrmCtrl['applicationType'].setValidators([
      Validators.required,
    ]);
    this.editCaseDiaryFrmCtrl['city'].setValidators([Validators.required]);
    this.editCaseDiaryFrmCtrl['applicationSection'].setValidators([
      Validators.required,
    ]);

    this.routerState = this._router.getCurrentNavigation()?.extras.state;
    if (this.routerState?.mode == "edit") {
      this.getCaseDiaryDetail(this.routerState.caseDiaryId);
    }
    if (this.routerState == undefined) {
      this._router.navigate(['/lawyer/case-diary/cases']);
    }
  }

  get editCaseDiaryFrmCtrl() {
    return this.editCaseDiaryForm.controls;
  }

  getCaseDiaryDetail(caseDiaryId: string) {
    this._apolloService.mutate(GQLConfig.getCaseDiaryDetail, { caseDiaryId: caseDiaryId }).subscribe(respObj => {
      if (respObj.data != null) {
        if (respObj.data.caseDiaryDetail.status == 200) {
          this.editCaseDiaryForm.patchValue(respObj.data.caseDiaryDetail.data);
        }
        else {
          this._toastMessage.error(respObj.data.caseDiaryDetail.message);
        }
      }
    })
  }

  updateCaseDiary() {
    if (this.editCaseDiaryForm.valid) {
      let data = {
        caseDiaryId: this.editCaseDiaryForm.controls._id.value,
        registrationDate: this.editCaseDiaryForm.controls.registrationDate.value,
        courtName: this.editCaseDiaryForm.controls.courtName.value,
        caseNumber: parseInt(this.editCaseDiaryForm.controls.caseNumber.value),
        caseName: this.editCaseDiaryForm.controls.caseName.value,
        caseStage: this.editCaseDiaryForm.controls.caseStage.value,
        city: this.editCaseDiaryForm.controls.city.value,
        applicantName: this.editCaseDiaryForm.controls.applicantName.value,
        respondentName: this.editCaseDiaryForm.controls.respondentName.value,
        applicationType: this.editCaseDiaryForm.controls.applicationType.value,
        applicationSection: this.editCaseDiaryForm.controls.applicationSection.value,
        nextHearingDate: this.editCaseDiaryForm.controls.nextHearingDate.value,
        lawyreasonForAbsent: this.editCaseDiaryForm.controls.lawyreasonForAbsent.value
      }
      this._apolloService.mutate(GQLConfig.updateCaseDiary, data).subscribe((objRes) => {
        if (objRes.data != null) {
          if (objRes.data.caseDiaryUpdate.status == 200) {
            this._toastMessage.success(objRes.data.caseDiaryUpdate.message);
            this._router.navigate(['/lawyer/case-diary/cases']);
          }
          else {
            this._toastMessage.error(objRes.data.caseDiaryUpdate.message);
          }
        }
      })
    }
    else {
      this._toastMessage.error("All fields are required !!");
    }
  }
}
