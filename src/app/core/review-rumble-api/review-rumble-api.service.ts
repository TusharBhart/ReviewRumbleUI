import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user.model';
import { TokenResponse } from './models/token-response.model';
import { PullRequest } from './models/pull-request.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewRumbleApiService {
  private readonly baseUrl = 'https://localhost:7063';
  private readonly httpClient = inject(HttpClient);

  public login(code: string): Observable<TokenResponse> {
    return this.httpClient.post<TokenResponse>(`${this.baseUrl}/login`, { code });
  }

  public getUser() : Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/api/user`);
  }

  public addPullRequest(url: string): Observable<PullRequest> {
    return this.httpClient.post<PullRequest>(`${this.baseUrl}/api/pullrequests`, { url });
  }

  public leaderboard(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/api/user/leaderboard`);
  }
}