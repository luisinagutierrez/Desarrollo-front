import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    
    if (token) {
      const currentTime = Math.floor(Date.now() / 1000);
      const tokenInformation = this.authService.getLoggedUser();
      if (tokenInformation && tokenInformation.exp < currentTime) {
        this.authService.logout();
        this.router.navigate(['UserRegistration/login']);
        return throwError(() => new Error('Su sesión ha expirado'));
      }
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request)
  }
}