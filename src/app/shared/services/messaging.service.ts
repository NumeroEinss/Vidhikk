import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject, mergeMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  currentMessage = new BehaviorSubject<any>(null);
  accessToken = new BehaviorSubject<string>("");

  constructor(private _afMessaging: AngularFireMessaging) { }

  requestPermission() {
    console.log('Requesting permission for notifications');
    this._afMessaging.requestToken.subscribe(
      {
        next: (token: any) => {
          console.log('Permission granted !!');
          this.accessToken.next(token);
        },
        error: (error) => {
          console.error('Permission denied or error occurred:', error);
        }
      }
    );
  }


  receiveMessaging() {
    this._afMessaging.messages.subscribe(
      {
        next: (payload: any) => {
          this.currentMessage.next(payload);
        },
        error: (error) => {
          console.error('Error receiving messages:', error);
        }
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
