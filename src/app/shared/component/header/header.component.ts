import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  @Input() menuName: string = "";

  constructor(private _router: Router) { }

  userProfile() {
    this._router.navigate(['/lawyer/user-profile'])
  }

}
