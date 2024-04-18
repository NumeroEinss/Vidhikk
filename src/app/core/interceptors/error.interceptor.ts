import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, map, pipe, throwError, timeout } from 'rxjs';
import { Router } from '@angular/router';
import { SnackAlertService } from '../../shared/services/snack-alert.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private _router: Router, private _toastMessage: SnackAlertService) { }

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   this._toastMessage.showLoader = true;
  //   return next.handle(request)
  //     .pipe(
  //       catchError((error: HttpErrorResponse) => {
  //         let errorMessage = 'An error occurred';

  //         if (error.error instanceof ErrorEvent) {
  //           // Client-side error
  //           errorMessage = `Error: ${error.error.message}`;
  //         }
  //         else if (error.status == 401) {
  //           this._router.navigateByUrl("/auth/login");
  //         }
  //         else {
  //           // Server-side error
  //           errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  //         }
  //         console.error(errorMessage);
  //         this._toastMessage.error((errorMessage));
  //         this._toastMessage.showLoader = false;
  //         return throwError(() => errorMessage);
  //       }),
  //       map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
  //         if (evt instanceof HttpResponse) {
  //           this._toastMessage.showLoader = false;
  //         }
  //         return evt;
  //       }))
  // }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._toastMessage.showLoader = true;

    // Set your desired timeout value in milliseconds
    // const timeoutValue = 10000; // 10 seconds

    return next.handle(request).pipe(
      // timeout(timeoutValue),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An error occurred';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else if (error.status == 401) {
          this._router.navigateByUrl("/auth/login");
        } else {
          // Server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        console.error(errorMessage);
        this._toastMessage.error(errorMessage);
        this._toastMessage.showLoader = false;
        return throwError(() => errorMessage);
      }),
      map<HttpEvent<any>, any>((evt: HttpEvent<any>) => {
        if (evt instanceof HttpResponse) {
          this._toastMessage.showLoader = false;
        }
        return evt;
      })
    );
  }
}