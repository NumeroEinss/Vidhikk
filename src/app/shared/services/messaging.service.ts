import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  currentMessage = new BehaviorSubject<any>(null);
  accessToken = new BehaviorSubject<string>("");

  constructor(private _afMessaging: AngularFireMessaging) {
    this.receiveMessaging();
  }

  requestPermission() {
    this._afMessaging.requestToken.subscribe(
      (token: any) => {
        console.log(token, 'tokenGenerated!!');
        console.log('Token Recieved !!');
        this.accessToken.next(token);
      }
    );
  }

  receiveMessaging() {
    console.log("Subscribing to messages...");
    this._afMessaging.messages.subscribe(
      (payload: any) => {
        console.log("new message received", payload);
        this.currentMessage.next(payload);
      }
    );
  }

  deleteToken() {
    this._afMessaging.getToken
      .pipe(
        mergeMap((token: string | null) => {
          if (token) {
            return this._afMessaging.deleteToken(token);
          } else {
            throw new Error('No token to delete');
          }
        })
      )
      .subscribe(
        data => {
          console.log('Token deleted:', data);
        }
      );
  }
}
