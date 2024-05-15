import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { ApolloService } from './apollo.service';
import { SnackAlertService } from './snack-alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any> | undefined;

  constructor(private _apolloService: ApolloService, private _router: Router, private _toastMessage: SnackAlertService,
    private _activatedRoute: ActivatedRoute) {

  }

  get currentUserValue() {
    return this.currentUserSubject?.value;
  }

  login(query: any, variables: any, userType: string) {
    this._apolloService.mutate(query, variables).subscribe(respObj => {
      if (respObj != null) {
        if (respObj.data.login.status == 200) {
          this._toastMessage.success(respObj.data.login.message); //notify the success
          localStorage.setItem('userData', JSON.stringify(respObj.data.login.data)); //set the data to Local Storage
          localStorage.setItem('token', respObj.data.login.data.accessToken)
          this.currentUserSubject?.next(respObj.data.login.data);

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
            this._router.navigate(['/lawyer/activity-feed']);
          }
          else if (userType == "SELLER") {
            // this._router.navigate(['/user/activity-feed']);
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
    })
  }

  logout() {
    localStorage.removeItem('userData');
    this.currentUserSubject?.next(null);
    localStorage.removeItem('token');
    this._router.navigateByUrl('auth/login');
  }

  // public handleError(error: HttpErrorResponse): Observable<never> {
  //   let errorMessage = 'An error occurred';

  //   if (error.error instanceof ErrorEvent) {
  //     // Client-side error
  //     errorMessage = `Error: ${error.error.message}`;
  //   }
  //   else if (error.status == 401) { //Unauthorized
  //     this._router.navigateByUrl("/auth/login");
  //   }
  //   else {
  //     // Server-side error
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //   }
  //   console.error(errorMessage);
  //   return throwError(() => errorMessage);
  // }
}
