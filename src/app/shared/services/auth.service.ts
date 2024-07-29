import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ToastMessageService } from './snack-alert.service';
import { Apollo } from 'apollo-angular';
import { MessagingService } from './messaging.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  message: any = null;
  private subscription$: Subscription;
  private messageSubscription$: Subscription;
  fireBaseToken: string = "";

  private currentUserSubject: BehaviorSubject<any> | undefined;

  constructor(private _apollo: Apollo, private _router: Router, private _toastMessage: ToastMessageService,
    private _activatedRoute: ActivatedRoute, private _messagingService: MessagingService) {
    this.subscription$ = this._messagingService.accessToken.subscribe(data => {
      if (data) {
        // console.log(data, 'Subscription for token !!');
        this.fireBaseToken = data;
        localStorage.setItem('messageToken', data);
      } else {
        // console.error('Access token is empty.');
      }
    });
    this.messageSubscription$ = this._messagingService.currentMessage.subscribe((data: any) => {
      if (data) {
        // console.log(data, 'messageSubscription')
        this.message = data;
        this._toastMessage.showMessage(data.notification.title, data.notification.body);
      }
    });
  }

  get currentUserValue() {
    return this.currentUserSubject?.value;
  }

  login(query: any, variables: any, userType: string) {
    if (this.fireBaseToken === "") {
      this._messagingService.requestPermission();
    };
    setTimeout(() => {
      variables.notificationToken = this.fireBaseToken;
      this._apollo.mutate({ mutation: query, variables: variables, errorPolicy: 'all' }).subscribe((respObj: any) => {
        if (respObj != null) {
          if (respObj.data.login.status == 200) {
            this._toastMessage.success(respObj.data.login.message); //notify the success
            localStorage.setItem('userData', JSON.stringify(respObj.data.login.data)); //set the data to Local Storage
            localStorage.setItem('isCaseDiaryLogin', JSON.stringify(false));
            localStorage.setItem('vidhikToken', respObj.data.login.data.accessToken)
            this.currentUserSubject?.next(respObj.data.login.data);

            //redirect the user as per the selected type
            if (userType == "USER") {
              if (this._router.url.includes('?')) {
                this._router.navigate([this._activatedRoute.snapshot.queryParams.returnUrl]);
              }
              else {
                this._router.navigate(['/user/activity-feed']);
              }
            }
            else if (userType == "LAWYER") {
              if (this._router.url.includes('?')) {
                this._router.navigate([this._activatedRoute.snapshot.queryParams.returnUrl]);
              }
              else {
                this._router.navigate(['/lawyer/activity-feed']);
              }
            }
            else if (userType == "SELLER") {
              // this._router.navigate(['/seller/activity-feed']);
              this._toastMessage.message('Please select different user !!');
            }
            else if (userType == "JUDGE") {
              this._router.navigate(['/judge/activity-feed']);
            }
          }
          else {
            this._toastMessage.error(respObj.data.login.message);
          }
        }
      })
    }, 2000);
  }

  logout() {
    localStorage.removeItem('userData');
    this.currentUserSubject?.next(null);
    localStorage.removeItem('vidhikToken');
    localStorage.removeItem('messageToken');
    localStorage.removeItem('isCaseDiaryLogin');
    this._router.navigateByUrl('auth/login');
    this.subscription$.unsubscribe();
    this.messageSubscription$.unsubscribe();
    this._messagingService.deleteToken();
  }
}
