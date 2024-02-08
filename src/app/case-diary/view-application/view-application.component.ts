import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-application',
  templateUrl: './view-application.component.html',
  styleUrl: './view-application.component.scss',
})
export class ViewApplicationComponent {
  
  caseDiary: any[] = [
    { value: 'Indore', viewValue: 'Indore' },
    { value: 'Bhopal', viewValue: 'Bhopal' },
    { value: 'Mumbai', viewValue: 'Mumbai' },
  ];

  constructor(private _router: Router) {}

  backButton(){
    this._router.navigate([`lawyer/case-diary/cases`]);
  }
}
