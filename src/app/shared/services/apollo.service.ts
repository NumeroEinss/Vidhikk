import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, timeout } from 'rxjs';
import { SnackAlertService } from './snack-alert.service';
import { Apollo, TypedDocumentNode } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class ApolloService {

  // private baseUrl = "http://3.108.97.222:8000/api/";

  constructor(private _apollo: Apollo, private snackAlert: SnackAlertService) { }

  // get(url: string): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Accept': '*/*',
  //   });
  //   return this.http
  //     .get(this.baseUrl + url, { headers });
  // }

  // post(url: string, body?: any): Observable<any> {
  //   const data = body;
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Accept': '*/*',
  //   });
  //   return this.http
  //     .post(this.baseUrl + url, data, { headers });
  // }

  // delete(url: string, body?: any): Observable<any> {
  //   const data = body;
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Accept': '*/*'
  //   })
  //   return this.http
  //     .delete(this.baseUrl + url, { headers });
  // }

  // put(url: string, body: any): Observable<any> {
  //   const data = body;
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Accept': '*/*'
  //   })
  //   return this.http
  //     .put(this.baseUrl + url, data, { headers });
  // }

  query(query: TypedDocumentNode<any>, variables?: Object): Observable<any> {
    return this._apollo.query({ query: query, variables: variables })
  };

  mutate(mutation: TypedDocumentNode<any>, variables: Object): Observable<any> {
    return this._apollo.mutate({ mutation: mutation, variables: variables }).pipe(timeout(2000));
  }
}
