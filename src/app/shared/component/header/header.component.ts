import { AfterViewInit, Component, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { getBaseUrl, imageUrl } from '../../../graphql.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Subscription, takeUntil, timeout } from 'rxjs';
import { ApolloService } from '../../services/apollo.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements AfterViewInit, OnDestroy {
  userType: string = "";
  userImage: string = "";
  notifications: any = [];
  sub$: Subscription;
  isSidebarOpen: boolean = false;
  userData: any;
  qrData: string = "My Vidhik";
  transactionId: any = "";
  currentUserSubscription: Subscription;
  activePlan: string = "Free Plan";

  @Input() menuName: string = "";
  @Input() searchStyle = { width: '0px', display: 'none' };
  @Input() searchIcon = { width: 'auto', display: 'block' };
  @Input() colConfig: string = "col-lg-8 col-md-8";
  onDestroy$: Subject<void> = new Subject();

  constructor(private _router: Router, private _location: Location, public _authService: AuthService,
    private _http: HttpClient, private renderer: Renderer2, private elementRef: ElementRef, private _apolloService: ApolloService) {
    this.sub$ = this._authService.profileImageSubject.asObservable()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data: any) => {
        this.userImage = data;
      });

    this.currentUserSubscription = this._authService.currentUserSubject
      .subscribe(user => {
        // Handle the updated user data
        this.activePlan = user.activePlan;
      }); 

    this.getNotificationList();
    this.userType = this._router.url.split('/')[1];
    this.userData = JSON.parse(sessionStorage.getItem('userData')!);
    this.renderer.listen('document', 'click', (event: Event) => this.onDocumentClick(event));
  }

  onDocumentClick(event: Event): void {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside && this.isSidebarOpen) {
      this.isSidebarOpen = false;
    }
  }

  ngAfterViewInit() {
    // this.getQrData();
  }

  getQrData(e: any) {
    this._apolloService.post('/payment/make-payment', { amount: e }).subscribe(objRes => {
      if (objRes != null) {
        if (objRes.status == 'success') {
          this.qrData = objRes.data.url;
          this.transactionId = objRes.data.transactionId;
        }
      }
    })
  }

  redirectToProfile() {
    if (this.userType == "user") {
      this._router.navigate(['/user/user-profile']);
    }
    else if (this.userType == "lawyer") {
      this._router.navigate(['/lawyer/user-profile']);
    }
    else if (this.userType == "seller") {
      this._router.navigate(['/seller/user-profile']);
    }
    else if (this.userType == "judge") {
      this._router.navigate(['/judge/user-profile']);
    }
  }

  redirectToSearch() {
    if (this.userType == "user") {
      this._router.navigate(['/user/global-search']);
    }
    else if (this.userType == "lawyer") {
      this._router.navigate(['/lawyer/global-search']);
    }
    else if (this.userType == "seller") {
      this._router.navigate(['/seller/global-search']);
    }
    else if (this.userType == "judge") {
      this._router.navigate(['/judge/global-search']);
    }
  }

  routeBack() {
    this._location.back()
  }

  getImageUrl(image: any) {
    return imageUrl() + image;
  }

  getNotificationList() {
    let userData = JSON.parse(sessionStorage.getItem('userData')!);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*'
    })
    this._http.get(getBaseUrl() + `/notifications/${userData._id}/${userData.userType.toLowerCase()}`, { headers }).subscribe((data: any) => {
      if (data != null) {
        if (data.status == 200) {
          this.notifications = data.data;
          if (this.notifications.length == 0) {
            this.notifications = [{
              title: "No Notifications",
              notificationType: "noData",
              body: "No Notifications found !!",
            }]
          }
        }
      }
    })
  }

  getDaysAgo(date: Date) {
    let today: Date = new Date();
    let daysAgo = Math.floor((today.getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24))
    return daysAgo > 0 ? daysAgo : daysAgo * (-1);
  }

  openNotification() {
    let el = document.getElementById('openNotifications') as HTMLElement;
    el.click();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logoutCaseDiary() {
    sessionStorage.setItem('isCaseDiaryLogin', JSON.stringify(false));
  }

  logout() {
    this._authService.logout();
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
