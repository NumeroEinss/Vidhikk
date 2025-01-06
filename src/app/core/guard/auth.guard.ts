import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { ToastMessageService } from '../../shared/services/snack-alert.service';

@Injectable()
export class AuthGuard {

  constructor(private router: Router, private _toastMessage: ToastMessageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userData: any = JSON.parse(sessionStorage.getItem("userData")!);
    if (sessionStorage.getItem('vidhikToken')) {
      // Check if user type matches the allowed type for this route
      if (userData.userType === 'USER' && state.url.startsWith('/user')) {
        return true; // Admin accessing admin route
      }
      else if (userData.userType === 'LAWYER' && state.url.startsWith('/lawyer')) {
        return true; // User accessing user route
      }
      else if (userData.userType === 'JUDGE' && state.url.startsWith('/judge')) {
        return true; // Tutor accessing tutor route
      }
      else if (state.url.startsWith('/auth')) {
        return true;
      }
      else {
        // Redirect to unauthorized page or handle unauthorized access
        this.router.navigate(['/auth/login']);
        this._toastMessage.error('Unauthorized !!');
        return false;
      }
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}