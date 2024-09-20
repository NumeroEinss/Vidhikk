import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, lastValueFrom, Subscription } from 'rxjs';
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
  profileImageSubject: BehaviorSubject<string> = new BehaviorSubject("");

  constructor(private _apollo: Apollo, private _router: Router, private _toastMessage: ToastMessageService,
    private _activatedRoute: ActivatedRoute, private _messagingService: MessagingService) {
    this._messagingService.requestPermission();
    this.subscription$ = this._messagingService.accessToken.asObservable().subscribe(data => {
      if (data) {
        console.log('Subscription for token !!');
        this.fireBaseToken = data;
        // sessionStorage.setItem('messageToken', data);
      } else {
        console.error('Access token is empty.');
      }
    });
    this.messageSubscription$ = this._messagingService.currentMessage.subscribe((data: any) => {
      if (data) {
        this.message = data;
        this._toastMessage.showMessage(data.notification.title, data.notification.body);
      }
    });
    if (sessionStorage.getItem('userData')) {
      const userData = JSON.parse(sessionStorage.getItem('userData')!);
      this.profileImageSubject?.next(userData.profileImage)
    }
  }

  get currentUserValue() {
    return this.currentUserSubject?.value;
  }

  async login(query: any, variables: any, userType: string) {
    // setTimeout(() => {
    variables.notificationToken = this._messagingService.accessToken.value;
    console.log('Token Generated')
    let sub: any = this._apollo.mutate({ mutation: query, variables: variables, errorPolicy: 'all' })
    let respObj: any = await lastValueFrom(sub);
    if (respObj != null) {
      if (respObj.data.login.status == 200) {
        this._toastMessage.success(respObj.data.login.message); //notify the success
        sessionStorage.setItem('userData', JSON.stringify(respObj.data.login.data)); //set the data to Local Storage
        sessionStorage.setItem('isCaseDiaryLogin', JSON.stringify(false));
        sessionStorage.setItem('vidhikToken', respObj.data.login.data.accessToken)
        this.currentUserSubject?.next(respObj.data.login.data);
        this.profileImageSubject.next(respObj.data.login.data.profileImage)

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
    // }, 200);
  }

  updateProfile(data: any) {
    this.currentUserSubject?.next(data);
    this.profileImageSubject.next('');
    this.profileImageSubject.next(data.profileImage);
    sessionStorage.setItem('userData', JSON.stringify(data));
  }

  logout() {
    sessionStorage.removeItem('userData');
    this.currentUserSubject?.next(null);
    this.profileImageSubject?.next("");
    sessionStorage.removeItem('vidhikToken');
    // sessionStorage.removeItem('messageToken');
    sessionStorage.removeItem('isCaseDiaryLogin');
    this._router.navigateByUrl('auth/login');
    this.fireBaseToken = "";
    this.subscription$.unsubscribe();
    this.messageSubscription$.unsubscribe();
    this._messagingService.deleteToken();
  }
}
