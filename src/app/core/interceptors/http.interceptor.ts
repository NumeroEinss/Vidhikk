import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
//import { AuthService } from './auth.service';

@Injectable()
export class HttpIntterceptor implements HttpInterceptor {
  constructor(/*private authService: AuthService*/) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = "";//this.authService.getToken();
    // Clone the request and attach the token
    const authReq = req.clone({
      setHeaders: {
        Authorization: authToken ? `Bearer ${authToken}` : '',
        Accept: '*/*'
      }
    });

    return next.handle(authReq);
  }

  // // If there is no token, pass the original request
  // return next.handle(req);
}