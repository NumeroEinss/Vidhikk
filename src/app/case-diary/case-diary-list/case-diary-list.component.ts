import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  caseDiaryList = [
    {
      regDate: '01-01-23',
      courtName: 'Indore HG',
      caseNo: '2341',
      applicant: 'Karan Singh',
      respondent: 'Ram Kumar',
      caseStage: 'Stag 4',
      nextHearing: '12 Mar 2024',
      application: 'Criminal, Section 318',
      owner: 'Self',
      city: 'Indore',
    },
    {
      regDate: '21-11-23',
      courtName: 'Jabalpur HG',
      caseNo: '3432',
      applicant: 'Rajiram',
      respondent: 'Ghisa Ram',
      caseStage: 'Stag 2',
      nextHearing: '18 Dec 2024',
      application: 'Criminal, Section 318',
      owner: 'Self',
      city: 'Jabalpur',
    },
  ];

  subDiaryList = [
    {
      regDate: '01-01-23',
      courtName: 'Indore HG',
      caseNo: '2341',
      applicant: 'Karan Singh',
      respondent: 'Ram Kumar',
      caseStage: 'Stag 4',
      nextHearing: '12 Mar 2024',
      application: 'Criminal, Section 318',
      owner: 'Self',
      city: 'Indore',
      assignedTo: 'Punit Jain',
    },
    {
      regDate: '21-11-23',
      courtName: 'Jabalpur HG',
      caseNo: '3432',
      applicant: 'Rajiram',
      respondent: 'Ghisa Ram',
      caseStage: 'Stag 2',
      nextHearing: '18 Dec 2024',
      application: 'Criminal, Section 318',
      owner: 'Self',
      city: 'Jabalpur',
      assignedTo: 'Kapil S',
    },
  ];

  constructor(private _router: Router) {}

  viewCase(caseId: any) {
    this._router.navigate([`lawyer/case-diary/view-application/${caseId}`]);
  }
}
