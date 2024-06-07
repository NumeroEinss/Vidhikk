import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us-detail',
  templateUrl: './contact-us-detail.component.html',
  styleUrl: './contact-us-detail.component.scss'
})
export class ContactUsDetailComponent {
  routerState: any;
  comment: string = '';
  isCommentBoxOpen: boolean = false
  isPost: boolean = false;

  feedList = [
    {
      type: 'notification',
      name: 'Admin',
      message: 'changed ticket status from Open to inProcess',
      day: 'Mon',
      postDate: '09 May 2024',
      time: '01:00 PM',
      // userType: 'admin'
    },
    {
      userType: 'admin',
      type: 'comment',
      name: 'Admin',
      day: 'Mon',
      postDate: '09 May 2024',
      time: '01:00 PM',
      comment: 'The collapse of the online-advertising market in 2001 made marketing The collapse of the online-advertising market in 2001 made marketing The collapse of the online-advertising market in 2001 made marketing',
    },
    {
      userType: 'user',
      type: 'comment',
      name: 'Anurag',
      day: 'Mon',
      postDate: '09 May 2024',
      time: '01:00 PM',
      comment: 'The collapse of the online-advertising market in 2001 made marketing The collapse of the online-advertising market in 2001 made marketing The collapse of the online-advertising market in 2001 made marketing',
    },
  ]

  constructor(private _location: Location, private _router: Router) {
    this.routerState = this._router.getCurrentNavigation()!.extras.state;
    if (this.routerState == undefined) {
      this._router.navigateByUrl('user/contact-us');
    }
  }

  routeBack() {
    this._location.back();
  }

  addComment() {
    this.feedList.push({
      userType: 'user',
      type: 'comment',
      name: 'Anurag',
      day: new Date().toLocaleDateString('en-GB', { weekday: "short" }),
      postDate: new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric', day: 'numeric' }),
      time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true }).replace('pm', 'PM'),
      comment: this.comment,
    })
    this.comment = '';
    this.isCommentBoxOpen = false;
  }

  openImage(img: any) {
    window.open(img, 'blank')
  }
}
