import { Component } from '@angular/core';
import { ToastMessageService } from './shared/services/snack-alert.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'Vidhik';
  loaderType = ngxLoadingAnimationTypes;
  constructor(public toastMessage: ToastMessageService) {
  }

}
