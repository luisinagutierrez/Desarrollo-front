import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isLoggedIn()) {
      const currentTime = Math.floor(Date.now() / 1000);
      const tokenInformation = this.authService.getLoggedUser()
      if (tokenInformation.exp < currentTime) this.authService.logout()
    }
  
    // if (token) { // ESTO LO PUEDEN USAR PARA RUTAS PROTEGIDAS
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${ token }`
    //     }
    //   })
    // }

    return next.handle(request)
  }
}
