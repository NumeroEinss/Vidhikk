import { Component, AfterViewInit } from '@angular/core';
import { ToastMessageService } from '../../services/snack-alert.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements AfterViewInit {

  constructor(private _toastMessage: ToastMessageService) {
    this._toastMessage.showLoader = true;
  }

  ngAfterViewInit() {
    this._toastMessage.showLoader = false; 
  }
}
