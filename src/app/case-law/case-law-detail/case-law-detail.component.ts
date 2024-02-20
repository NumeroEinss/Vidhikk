import { Location } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-case-law-detail',
  templateUrl: './case-law-detail.component.html',
  styleUrl: './case-law-detail.component.scss'
})
export class CaseLawDetailComponent {

  constructor(private _location: Location) { }

  routeBack() {
    this._location.back();
  }
}
