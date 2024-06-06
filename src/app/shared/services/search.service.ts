import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ApolloService } from './apollo.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'https://api.example.com/search'; // Replace with your API endpoint

  constructor(private _apolloService: ApolloService) { }

  search(query: string): Observable<any> {
    return this._apolloService.get(`/judge/search/${query}`).pipe(
      map(response => response.data) // Adjust based on API response structure
    );
  }
}
