import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { BehaviorSubject, mergeMap } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  currentMessage = new BehaviorSubject<any>(null);
  accessToken = new BehaviorSubject<string>("");

  constructor(private _afMessaging: AngularFireMessaging, private _authService: AuthService) { }

  requestPermission(query: any, variables: any, userType: string) {
    console.log('Requesting permission for notifications');
    this._afMessaging.requestToken.subscribe(
      {
        next: (token: any) => {
          console.log('Permission granted !!');
          this.accessToken.next(token);
          console.log(token, 'Generated Token !!');
          this._authService.login(query, variables, userType);
        },
        error: (error) => {
          console.error('Permission denied or error occurred:', error);
        }
      }
    );
  }


  receiveMessaging() {
    // console.log('Setting up message receiver');
    this._afMessaging.messages.subscribe(
      {
        next: (payload: any) => {
          // console.log('Message received', payload);
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
