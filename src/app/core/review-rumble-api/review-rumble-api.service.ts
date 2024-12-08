import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ReviewRumbleApiService {
  private readonly baseUrl = 'https://localhost:7063';
  private readonly httpClient = inject(HttpClient);

  public login(code: string): Observable<string> {
    return this.httpClient.post<string>(`${this.baseUrl}/user/login`, { code });
  }

  public getUser() : Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/user`);
  }
}