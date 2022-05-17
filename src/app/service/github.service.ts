import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  getUserDetails(username: any) {
    return this.http.get(`${BASE_URL}/users/${username}`, {
      headers: this.headers,
    });
  }
}
