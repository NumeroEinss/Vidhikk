import { Component } from '@angular/core';
import { MessagingService } from './shared/services/messaging.service';
import { ToastMessageService } from './shared/services/snack-alert.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Vidhik';
  loaderType = ngxLoadingAnimationTypes;

  constructor(
    private _messagingService: MessagingService,
    public toastMessage: ToastMessageService
  ) {

  }
}
