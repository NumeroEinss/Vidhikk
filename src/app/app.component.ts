import { Component } from '@angular/core';
import { SnackAlertService } from './shared/services/snack-alert.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'Vidhik';
  loaderType = ngxLoadingAnimationTypes;
  constructor(public toastMessage: SnackAlertService) {
  }

}
