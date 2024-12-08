import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { throwError } from 'rxjs/internal/observable/throwError';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    const userToken = authService.getToken();
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${userToken}`),
    });
  }

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/']);
      }

      return throwError(() => new Error(error.message));
    })
  );
};