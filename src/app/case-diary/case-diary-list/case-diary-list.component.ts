import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GQLConfig } from '../../graphql.operations';
import { ApolloService } from '../../shared/services/apollo.service';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { TemplateService } from '../../shared/services/template.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

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

  selectedSubDiary: any;

  constructor(private _router: Router, private _apolloService: ApolloService, private _toastMessage: ToastMessageService,
    private _templateService: TemplateService, private _datePipe: DatePipe) {
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
    let userData = sessionStorage.getItem('userData');
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
    let userData = sessionStorage.getItem('userData');
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
      representing: caseDiaryData.representing,
      FIRNumber: caseDiaryData.FIRNumber,
      FIRDate: caseDiaryData.FIRDate,
      sectionIPC: caseDiaryData.sectionIPC
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

  deleteSubDiary(subDiaryId: any) {
    this._apolloService.mutate(GQLConfig.deleteSubDiary, { subDiaryId: subDiaryId }).subscribe(objRes => {
      if (objRes.data != null) {
        if (objRes.data.deleteSubDiary.status == 200) {
          this._toastMessage.success(objRes.data.deleteSubDiary.message);
          this.getSubDiaryList();
        }
        else {
          this._toastMessage.error(objRes.data.deleteSubDiary.message);
        }
      }
    })
  }

  getSharingContent(cases: any) {
    const userData = JSON.parse(sessionStorage.getItem('userData')!);
    const statement = `Subject: Update on Today's Hearing - ${cases.caseName}

    Dear ${cases.representing == 'Applicant' ? cases.applicantName : cases.respondentName},
    
    I hope this message finds you well. I wanted to provide you with an update on the proceedings related to your case, ${cases.caseName}.
    Case Details:
    
    Case Stage: ${cases.caseStage}
    Court Name: ${cases.courtName}
    Hearing Date: ${this._datePipe.transform(new Date(), 'dd/MM/yyyy')}
    Next Hearing Date: ${this._datePipe.transform(new Date(cases.nextHearingDate || null), 'dd/MM/yyyy')}
    Filing Date: ${this._datePipe.transform(new Date(cases.registrationDate), 'dd/MM/yyyy')}
    
    Summary of Today's Proceedings:
    
    [Provide a brief summary of what transpired during the hearing today. For example, mention if any significant progress was made, if there were any adjournments, or if any specific orders were passed.]
    Next Steps:
    
    [Outline the next steps in the case. This could include preparation for the next hearing, any documents that need to be filed, or any actions the client needs to take.]
    
    Please feel free to reach out if you have any questions or need further clarification. We will continue to monitor the case closely and keep you updated on any new developments.
    
    Thank you for your continued trust and cooperation.
    
    Best regards,
    ${userData.name}
    Contact - ${userData.primaryPhoneNumber}
    ${userData.orgainization}`
    return statement;
  }

  ngOnDestroy() {
    this.applicationSubscription.unsubscribe();
  }
}
