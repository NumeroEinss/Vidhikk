import { Injectable } from '@angular/core';
import { Observable, catchError, timeout } from 'rxjs';
import { ToastMessageService } from './snack-alert.service';
import { Apollo, QueryRef, TypedDocumentNode } from 'apollo-angular';
import { GQLConfig } from '../../graphql.operations';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApolloService {
  private baseUrl: string = "http://84.247.151.137:3000";

  constructor(private _apollo: Apollo, private snackAlert: ToastMessageService, private _http: HttpClient) { }

  query(query: TypedDocumentNode<any>, variables?: Object): Observable<any> {
    return this._apollo.query({ query: query, variables: variables })
  };

  mutate(mutation: TypedDocumentNode<any>, variables?: Object): Observable<any> {
    return this._apollo.mutate({ mutation: mutation, variables: variables });
  }

  watcQuery(query: TypedDocumentNode<any>, variables?: Object): QueryRef<any> {
    return this._apollo.watchQuery<any>({ query: query })
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
}
