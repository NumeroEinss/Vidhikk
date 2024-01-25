import { Component } from '@angular/core';

@Component({
  selector: 'app-case-diary-list',
  templateUrl: './case-diary-list.component.html',
  styleUrl: './case-diary-list.component.scss'
})
export class CaseDiaryListComponent {

  caseDiary: any[] = [
    { value: 'Indore', viewValue: 'Indore' },
    { value: 'Bhopal', viewValue: 'Bhopal' },
    { value: 'Mumbai', viewValue: 'Mumbai' },
  ];

}
