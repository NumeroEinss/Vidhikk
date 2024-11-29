import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { ApolloService } from './apollo.service';

@Injectable({
  providedIn: 'root'
})
export class PaaymentService {

  private apiUrl = this._apolloService.BaseUrl + '/payment/payment-status';  // Replace with your actual API endpoint

  constructor(private http: HttpClient, private _apolloService: ApolloService) { }

  // Function to poll the API until success is received
  pollTransactionStatus(transactionId: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      // Polling every 5 seconds
      const interval = setInterval(() => {
        this.checkTransactionStatus(transactionId).subscribe(response => {
          if (response.success) {
            observer.next(true);  // Success response, stop polling
            observer.complete();
            clearInterval(interval);
          }
        });
      }, 5000);  // Poll every 5 seconds
    });
  }

  // Function to make the actual API call to check the transaction status
  private checkTransactionStatus(transactionId: string): Observable<any> {
    let userData = JSON.parse(sessionStorage.getItem('userData')!);
    let reqObj = { transactionId: transactionId };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: '*/*',
      user: userData._id
    })
    return this.http.post(`${this.apiUrl}`, reqObj, { headers }).pipe(
      catchError(error => {
        // Handle error if necessary
        console.error('Error checking transaction status', error);
        return of({ success: false });  // Return a default response for error scenarios
      })
    );
  }
}
