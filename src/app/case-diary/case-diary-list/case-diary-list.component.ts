import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GQLConfig } from '../../graphql.operations';
import { ApolloService } from '../../shared/services/apollo.service';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { TemplateService } from '../../shared/services/template.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-case-diary-list',
  templateUrl: './case-diary-list.component.html',
  styleUrl: './case-diary-list.component.scss',
})
export class CaseDiaryListComponent {
  selectedDiary: string = 'caseDiary';

  caseDiary: any[] = [
    { value: 'caseDiary', viewValue: 'Case Diary' },
    { value: 'subDiary', viewValue: 'Sub Diary' },
  ];

  caseDiaryList: any = [];

  subDiaryList: any = [];

  applicationTypeList: Array<any> = [];

  applicationSubscription: Subscription;

  today: Date = new Date();

  constructor(private _router: Router, private _apolloService: ApolloService, private _toastMessage: ToastMessageService,
    private _templateService: TemplateService) {
    let extras = this._router.getCurrentNavigation()?.extras.state;
    this.selectedDiary = extras?.diaryType == undefined ? 'caseDiary' : extras?.diaryType;
    this.selectedDiary == 'caseDiary' ? this.getCaseDiaryList() : this.getSubDiaryList();

    this.applicationSubscription = this._templateService.templateList.subscribe((x: any) => {
      this.applicationTypeList = x;
    });
  }

  viewCase(caseId: any) {
    this._router.navigate([`lawyer/case-diary/view-application/${caseId}`]);
  }

  getCaseDiaryList() {
    let userData = localStorage.getItem('userData');
    let parsedData = userData ? JSON.parse(userData) : {};
    this._apolloService.mutate(GQLConfig.getCaseDiaryList, { lawyerId: parsedData._id }).subscribe((data) => {
      if (data.data != null) {
        if (data.data.getCaseDiaryList.status == 200) {
          this.caseDiaryList = data.data.getCaseDiaryList.data.caseDiaryList.result;
        }
        else {
          this._toastMessage.error(data.data.getCaseDiaryList.message);
        }
      }
    });
  }

  editCaseDiary(caseDiaryId: string) {
    const extras = {
      mode: 'edit',
      caseDiaryId: caseDiaryId
    }
    this._router.navigate(['lawyer/case-diary/edit'], { state: extras });
  }

  diaryChange(e: any) {
    if (e.value == 'subDiary') {
      this.getSubDiaryList();
    }
    else if (e.value == 'caseDiary') {
      this.getCaseDiaryList();
    }
  }

  getSubDiaryList() {
    let userData = localStorage.getItem('userData');
    let parsedData = userData ? JSON.parse(userData) : {};
    this._apolloService.mutate(GQLConfig.getSubDiaryList, { lawyerId: parsedData._id }).subscribe((data) => {
      if (data.data != null) {
        if (data.data.subDiaryList.status == 200) {
          this.subDiaryList = data.data.subDiaryList.data.resultData;
        }
        else {
          this._toastMessage.error(data.data.subDiaryList.message);
        }
      }
    });
  }

  applicationTypeChange(e: any, caseDiaryId: any, caseDiaryData: any, diaryType: string) {
    if (e.value == 'Select') { }
    else {
      this.updateRecords(caseDiaryData, diaryType, caseDiaryId);
    }
  }


  updateRecords(caseDiaryData: any, diaryType: string, caseDiaryId: any) {
    let data = {
      caseDiaryId: diaryType == 'caseDiary' ? caseDiaryData._id : caseDiaryData.subDiary_id,
      registrationDate: caseDiaryData.registrationDate,
      courtName: caseDiaryData.courtName,
      caseNumber: caseDiaryData.caseNumber,
      caseName: caseDiaryData.caseName,
      caseStage: caseDiaryData.caseStage,
      city: caseDiaryData.city,
      applicantName: caseDiaryData.applicantName,
      respondentName: caseDiaryData.respondentName,
      applicationType: caseDiaryData.applicationType,
      applicationSection: caseDiaryData.applicationSection,
      nextHearingDate: caseDiaryData.nextHearingDate,
      lawyreasonForAbsent: caseDiaryData.lawyreasonForAbsent,
      representing: caseDiaryData.representing
    }
    this._apolloService.mutate(GQLConfig.updateCaseDiary, data).subscribe((objRes) => {
      if (objRes.data != null) {
        if (objRes.data.caseDiaryUpdate.status == 200) {
          this._toastMessage.success(objRes.data.caseDiaryUpdate.message);
          this._router.navigate([`lawyer/case-diary/view-application/${caseDiaryId}`]);
        }
        else {
          this._toastMessage.error(objRes.data.caseDiaryUpdate.message);
        }
      }
    })
  }

  ngOnDestroy() {
    this.applicationSubscription.unsubscribe();
  }
}
