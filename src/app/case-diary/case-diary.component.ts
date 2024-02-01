import { Component } from '@angular/core';

@Component({
  selector: 'app-case-diary',
  templateUrl: './case-diary.component.html',
  styleUrl: './case-diary.component.scss'
})

export class CaseDiaryComponent {

  caseDiary: any[] = [
    { value: 'Indore', viewValue: 'Indore' },
    { value: 'Bhopal', viewValue: 'Bhopal' },
    { value: 'Mumbai', viewValue: 'Mumbai' },
  ];
}
