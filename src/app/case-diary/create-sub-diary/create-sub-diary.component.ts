import { Component } from '@angular/core';

@Component({
  selector: 'app-create-sub-diary',
  templateUrl: './create-sub-diary.component.html',
  styleUrl: './create-sub-diary.component.scss'
})
export class CreateSubDiaryComponent {

  caseList: any[] = [
    { value: 'Civil', viewValue: 'Civil' },
    { value: 'Finance', viewValue: 'Finance' },
    { value: 'Taxation', viewValue: 'Taxation' },
  ];

  memberList: any[] = [
    { value: 'Civil', viewValue: 'Civil' },
    { value: 'Finance', viewValue: 'Finance' },
    { value: 'Taxation', viewValue: 'Taxation' },
  ];

}
