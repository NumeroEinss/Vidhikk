import { Component } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {


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

}
