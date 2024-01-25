import { Component } from '@angular/core';

@Component({
  selector: 'app-create-case-diary',
  templateUrl: './create-case-diary.component.html',
  styleUrl: './create-case-diary.component.scss'
})
export class CreateCaseDiaryComponent {

  courtNameList: any[] = [
    { value: 'District & Session Court INDORE', viewValue: 'District & Session Court INDORE' },
    { value: 'Civil Court GOHAD', viewValue: 'Civil Court GOHAD' },
    { value: 'District & Session Court BHOPAL', viewValue: 'District & Session Court BHOPAL' },
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



  constructor() { }


}
