import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  mobileNumber: string='';

  private currentUserSubject: BehaviorSubject<any> | undefined;

  constructor(private _http: HttpClient, private _router: Router) {

  }

  currentUserValue() {
    return this.currentUserSubject?.value;
  }

  login(url: string, data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    })
    this._http
      .post(url, data, { headers })
      .subscribe(((data: any) => {
        if (data.status == 200) {
          console.log(data.data);
          localStorage.setItem('userData', JSON.stringify(data.data));
          localStorage.setItem('token', data.data.token)
        }
      }));
  }

  logout() {

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
