import { inject, Injectable, signal } from '@angular/core';
import { authConfig } from './auth.config';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { ReviewRumbleApiService } from '../review-rumble-api/review-rumble-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly reviewRumbleApi = inject(ReviewRumbleApiService);

  public isAuthenticated = signal(false);

  authorize(): void {
    if (this.getToken() === null) {
      // TODO: Identify a better way to redirect to the authorization URL
      this.document.location.replace(
        `${authConfig.authorizeUrl}?client_id=${authConfig.clientId}&redirect_uri=${authConfig.callBackUrl}`
      );
    } else {
      this.isAuthenticated.set(true);
    }
  }

  handleCallback(): void {
    const url = new URL(this.document.location.href);
    const code = url.searchParams.get('code');

    if (code) {
      this.reviewRumbleApi.login(code).subscribe({
        next: (response) => {
          localStorage.setItem('access_token', response); // TODO: Store token in a more secure way (MAYBE use a cookie)
          this.isAuthenticated.set(true);

          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error(error);
          throw error;

          // TODO: Handle error case (MAYBE redirect to Unauthorized page)
        },
      });
    }

    // TODO: Handle error case (MAYBE redirect to Unauthorized page)
  }

  getToken(): string | null {
    const token = localStorage.getItem('access_token');

    if (token && this.isTokenExpired(token)) {
      this.logout();
      return null;
    }

    return token;
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.isAuthenticated.set(false);
  }

  isTokenExpired(token: string): boolean {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expiration = new Date(payload.exp * 1000);
    return expiration < new Date();
  }
}
