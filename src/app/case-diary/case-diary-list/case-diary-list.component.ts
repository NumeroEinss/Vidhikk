import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GQLConfig } from '../../graphql.operations';
import { ApolloService } from '../../shared/services/apollo.service';
import { ToastMessageService } from '../../shared/services/snack-alert.service';

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

  subDiaryList: any = [
    // {
    //   regDate: '01-01-23',
    //   courtName: 'Indore HG',
    //   caseNo: '2341',
    //   applicant: 'Karan Singh',
    //   respondent: 'Ram Kumar',
    //   caseStage: 'Stag 4',
    //   nextHearing: '12 Mar 2024',
    //   application: 'Criminal, Section 318',
    //   owner: 'Self',
    //   city: 'Indore',
    //   assignedTo: 'Punit Jain',
    // },
    // {
    //   regDate: '21-11-23',
    //   courtName: 'Jabalpur HG',
    //   caseNo: '3432',
    //   applicant: 'Rajiram',
    //   respondent: 'Ghisa Ram',
    //   caseStage: 'Stag 2',
    //   nextHearing: '18 Dec 2024',
    //   application: 'Criminal, Section 318',
    //   owner: 'Self',
    //   city: 'Jabalpur',
    //   assignedTo: 'Kapil S',
    // },
  ];

  constructor(private _router: Router, private _apolloService: ApolloService, private _toastMessage: ToastMessageService) {
    let extras = this._router.getCurrentNavigation()?.extras.state;
    this.selectedDiary = extras?.diaryType == undefined ? 'caseDiary' : extras?.diaryType;
    console.log(this.selectedDiary)
    this.selectedDiary == 'caseDiary' ? this.getCaseDiaryList() : this.getSubDiaryList();
  }

  viewCase(caseId: any) {
    this._router.navigate([`lawyer/case-diary/view-application/${caseId}`]);
  }

  getCaseDiaryList() {
    console.log("Case Diary");
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
    console.log("Sub Diary");
    let userData = localStorage.getItem('userData');
    let parsedData = userData ? JSON.parse(userData) : {};
    this._apolloService.mutate(GQLConfig.getSubDiaryList, { lawyerId: parsedData._id }).subscribe((data) => {
      if (data.data != null) {
        if (data.data.subDiaryList.status == 200) {
          this.subDiaryList = data.data.subDiaryList.data.data;
        }
        else {
          this._toastMessage.error(data.data.subDiaryList.message);
        }
      }
    });
  }
}
