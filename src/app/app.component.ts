import { Component } from '@angular/core';
import { ToastMessageService } from './shared/services/snack-alert.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { mergeMap } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'Vidhik';
  loaderType = ngxLoadingAnimationTypes;
  message: any = null;

  constructor(private afMessaging: AngularFireMessaging, public toastMessage: ToastMessageService) {
  }

  ngOnInit() { this.requestPermission(); this.listen(); }

  requestPermission() {
    this.afMessaging.requestToken
      .subscribe((data: any) => {
        console.log('Permission granted! Save to the server!', data);
        console.log('data', data)
      }),
      ((error: any) => { console.log(error, 'error') });
  }

  deleteToken() {
    this.afMessaging.getToken
      .pipe(mergeMap((token: any) => this.afMessaging.deleteToken(token)))
      .subscribe(
        (token) => { console.log('Token deleted!'); },
      );
  }

  listen() {
    this.afMessaging.messages
      .subscribe((message) => { console.log(message, 'Message'); });
  }
}
