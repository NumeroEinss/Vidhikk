import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-lawyer-layout',
  templateUrl: './lawyer-layout.component.html',
  styleUrl: './lawyer-layout.component.scss'
})
export class LawyerLayoutComponent {
  isSidebarOpen: boolean = false;
  
  constructor(private _authService: AuthService) { }

  logoutCaseDiary() {
    sessionStorage.setItem('isCaseDiaryLogin', JSON.stringify(false));
  }

  logout() {
    this._authService.logout();
  }
}
