import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  notifications=[
    {
      image:'../assets/images/notification_user.png',
      name:'Member Request',
      detail:'You have new request. Get excited! click to view',
      days:'4 mins ago'
    },
    {
      image:'../assets/images/notification_user.png',
      name:'Member Request',
      detail:'Your Exotic Veggie Platter is on the menu. Get excited!',
      days:'2 days ago'
    },
    {
      image:'../assets/images/notification_user.png',
      name:'Member Request',
      detail:'You have new request. Get excited! click to view',
      days:'12 days ago'
    },
  ];

  @Input() menuName: string = "";

  constructor(private _router: Router) { }

  userProfile() {
    this._router.navigate(['/lawyer/user-profile'])
  }

}
