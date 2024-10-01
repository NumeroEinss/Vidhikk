import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class caseDiaryGuard {

  constructor(private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isCaseDiaryLogin: any = JSON.parse(sessionStorage.getItem("isCaseDiaryLogin")!);
    if (isCaseDiaryLogin == true) {
      return true;
    }
    else {
      this._router.navigate(["lawyer/case-diary/login"]);
      return false;
    }
  };
}
