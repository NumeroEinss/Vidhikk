import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { SnackAlertService } from './snack-alert.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseUrl = "http://3.108.97.222:8000/api/";

  constructor(private http: HttpClient, private snackAlert: SnackAlertService) { }

  get(url: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*',
    });
    return this.http
      .get(this.baseUrl + url, { headers });
  }

  post(url: string, body?: any): Observable<any> {
    const data = body;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*',
    });
    return this.http
      .post(this.baseUrl + url, data, { headers });
  }

  delete(url: string, body?: any): Observable<any> {
    const data = body;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    })
    return this.http
      .delete(this.baseUrl + url, { headers });
  }

  put(url: string, body: any): Observable<any> {
    const data = body;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    })
    return this.http
      .put(this.baseUrl + url, data, { headers });
  }
}
