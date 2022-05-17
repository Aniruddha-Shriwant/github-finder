import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'https://api.github.com';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  headers: HttpHeaders = new HttpHeaders({
    Authorization: `token ${'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'}`,
    Accept: 'application/vnd.github.v3+json',
  });
  constructor(private http: HttpClient) {}

  getUserDetails(username: string): Observable<any> {
    return this.http.get(`${BASE_URL}/users/${username}`, {
      headers: this.headers,
    });
  }

  getUserRepos(username: string, page: number, max: number): Observable<any> {
    const encodedQuery: string = encodeURI(
      `user:${username} in:name sort:updated-asc`
    );
    return this.http.get(
      `${BASE_URL}/search/repositories?q=${encodedQuery}&page=${page}&per_page=${max}`,
      {
        headers: this.headers,
      }
    );
  }
}
