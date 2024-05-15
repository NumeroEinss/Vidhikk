import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, timeout } from 'rxjs';
import { SnackAlertService } from './snack-alert.service';
import { Apollo, TypedDocumentNode } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class ApolloService {

  constructor(private _apollo: Apollo, private snackAlert: SnackAlertService) { }

  query(query: TypedDocumentNode<any>, variables?: Object): Observable<any> {
    return this._apollo.query({ query: query, variables: variables })
  };

  mutate(mutation: TypedDocumentNode<any>, variables: Object): Observable<any> {
    return this._apollo.mutate({ mutation: mutation, variables: variables });
  }
}
