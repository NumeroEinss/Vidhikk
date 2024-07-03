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
    let searchQuery = query.trim();
    if (searchQuery == "") {
      return this._apolloService.get(`/judge?page=1&pageSize=50`).pipe(
        map(response => response.data) // Adjust based on API response structure
      );
    }
    else {
      return this._apolloService.get(`/judge/search/${searchQuery.trim()}`).pipe(
        map(response => response.data) // Adjust based on API response structure
      );
    }
  }

  searchCourt(query: string): Observable<any> {
    let searchQuery = query.trim();
    if (searchQuery == "") {
      return this._apolloService.get(`/court?page=1&pageSize=50`).pipe(
        map(response => response.data) // Adjust based on API response structure
      );
    }
    else {
      return this._apolloService.get(`/court/search/${searchQuery.trim()}`).pipe(
        map(response => response.data) // Adjust based on API response structure
      );
    }
  }
}
