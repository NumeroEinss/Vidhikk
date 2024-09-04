import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { imageUrl } from '../../../graphql.module';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  userType: string = "";
  userImage: string = "";
  notifications: any = [];

  @Input() menuName: string = "";
  @Input() searchStyle = { width: '0px', display: 'none' };
  @Input() searchIcon = { width: 'auto', display: 'block' };
  @Input() colConfig: string = "col-lg-8 col-md-8";

  constructor(private _router: Router, private _location: Location, private _authService: AuthService, private _http: HttpClient) {
    this.getNotificationList();
    this.userType = this._router.url.split('/')[1];
    this._authService.profileImageSubject.subscribe(data => {
      this.userImage = data;
    });
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
    let userData = JSON.parse(localStorage.getItem('userData')!);
    this._http.get(imageUrl() + `/notifications/${userData._id}/${userData.userType.toLowerCase()}`).subscribe((data: any) => {
      if (data != null) {
        if (data.status == 200) {
          this.notifications = data.data;
        }
        else {
          this.notifications = {
            title: "No Notifications",
            notificationType: "noData",
            body: "No Notifications found !!",
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

  openNoification() {
    let el = document.getElementById('openNotifications') as HTMLElement;
    el.click();
  }
}
