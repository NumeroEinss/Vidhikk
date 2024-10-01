import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastMessageService } from '../../shared/services/snack-alert.service';
import { AuthService } from '../../shared/services/auth.service';
import { MessagingService } from '../../shared/services/messaging.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private _router: Router, private _toastMessage: ToastMessageService, private _authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._toastMessage.showLoader = true;
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // Client-side errors
          errorMessage = `Client-side error: ${error.error.message}`;
        }
        else if (error.status == 401) {
          this._toastMessage.error('Unauthorized User !!');
          this._authService.logout();
        }
        else {
          // Server-side errors
          errorMessage = `Server-side error: ${error.status} ${error.message}`;
        }

        // Handle different HTTP status codes
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
          // Add more cases as needed
          default:
            errorMessage = `Unexpected error: ${error.status}`;
        }

        // Log the error or show a notification to the user
        console.error(errorMessage);
        this._toastMessage.error(error.message)
        // Return an observable with a user-facing error message
        return throwError(() => new Error(errorMessage));
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