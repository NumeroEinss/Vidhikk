import { Component } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { SubscriptionService } from '../shared/services/subscription.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lawyer-layout',
  templateUrl: './lawyer-layout.component.html',
  styleUrl: './lawyer-layout.component.scss'
})
export class LawyerLayoutComponent {
  isSidebarOpen: boolean = false;
  menuConfig: any = {};
  sub$?: Subscription;

  constructor(private _authService: AuthService, public subscriptionService: SubscriptionService, private _router: Router) {
    this.getMenuConfigData();
  }

  async getMenuConfigData() {
    this.sub$ = this.subscriptionService.subscriptionplanSubject.asObservable().subscribe((data: any) => {
      this.menuConfig = data;
    })
  }

  logoutCaseDiary() {
    sessionStorage.setItem('isCaseDiaryLogin', JSON.stringify(false));
  }

  logout() {
    this._authService.logout();
  }

  navigate(url: any) {
    this._router.navigate([url]);
  }

  ngOnDestroy() {
    this.sub$?.unsubscribe();
  }
}
