import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { AuthService } from '../../shared/services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private _router: Router, private _toastMessage: ToastMessageService, private _authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._toastMessage.showLoader = true;
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Client-side error: ${error.error.message}`;
        } else if (error.status == 401) {
          this._toastMessage.error('Unauthorized User !!');
          this._authService.logout();
        } else {
          errorMessage = `Server-side error: ${error.status} ${error.message}`;
        }

        switch (error.status) {
          case 400:
            errorMessage = 'Bad Request';
            break;
          case 401:
            errorMessage = 'Unauthorized';
            break;
          case 403:
            errorMessage = 'Forbidden';
            break;
          case 404:
            errorMessage = 'Not Found';
            break;
          case 500:
            errorMessage = 'Internal Server Error';
            break; 
          default:
            errorMessage = `Unexpected error: ${error.status}`;
        }

        console.error(errorMessage);
        this._toastMessage.error(error.message);

        return throwError(() => new Error(errorMessage));
      }),
      finalize(() => {
        this._toastMessage.showLoader = false; // Hide loader in both success and error cases
      })
    );
  }
}
