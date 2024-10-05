import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError, timeout } from 'rxjs';
import { ToastMessageService } from './snack-alert.service';
import { Apollo, TypedDocumentNode } from 'apollo-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { getBaseUrl } from '../../graphql.module';

@Injectable({
  providedIn: 'root'
})
export class ApolloService {
  // private baseUrl: string = "http://84.247.151.137:3000";
  private baseUrl: string = "https://api2.myvidhik.com"; //ssl server

  constructor(private _apollo: Apollo, private _toastMessage: ToastMessageService, private _http: HttpClient,
    private _authService: AuthService) { }

  get BaseUrl() {
    return this.baseUrl;
  }

  query(query: TypedDocumentNode<any>, variables?: Object): Observable<any> {
    return this._apollo.query({ query: query, variables: variables, errorPolicy: 'all' })
      .pipe(
        map(response => {
          // Check if there are GraphQL errors in the response
          if (response.errors) {
            throw response.errors;
          }
          return response;
        }),
        catchError(error => {
          this.handleError(error);
          return throwError(() => error);
        })
      );
  };

  mutate(mutation: TypedDocumentNode<any>, variables?: Object): Observable<any> {
    return this._apollo.mutate({ mutation: mutation, variables: variables, errorPolicy: 'all' })
      .pipe(
        map(response => {
          // Check if there are GraphQL errors in the response
          if (response.errors) {
            throw response.errors;
          }
          return response;
        }),
        catchError(error => {
          this.handleError(error);
          return throwError(() => error);
        })
      );
  }

  get(url: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
    });
    return this._http
      .get(this.baseUrl + url, { headers });
  }

  post(url: string, body: any): Observable<any> {
    const data = body;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
    });
    return this._http
      .post(this.baseUrl + url, data, { headers });
  }

  delete(url: string,): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
    });
    return this._http
      .delete(this.baseUrl + url, { headers });
  }

  put(url: string, body: any): Observable<any> {
    const data = body;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
    });
    return this._http
      .put(this.baseUrl + url, data, { headers });
  }

  handleError(error: any) {
    if (error[0].message == 'Forbidden') {
      this._toastMessage.error("Access Denied !! Login Again");
      this._authService.logout();
    }
  }

  upload(mutation: any, file: any, mapName: string): Observable<any> {
    const operations = JSON.stringify(mutation);

    const map = JSON.stringify({
      [mapName]: ["variables.file"]
    });

    const formData = new FormData();
    formData.append('operations', operations);
    formData.append('map', map);
    formData.append(mapName, file);

    return this._http.post(getBaseUrl(), formData, {
      headers: {
        'x-apollo-operation-name': 'CreateTicket',
        "apollo-require-preflight": "true"
      }
    });
  }
}
