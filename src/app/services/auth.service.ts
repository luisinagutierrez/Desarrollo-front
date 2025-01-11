import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError  } from 'rxjs'; 
import { catchError } from 'rxjs/operators';
import jwtDecode from 'jwt-decode'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = 'http://localhost:3000/api'
  private tokenKey = 'access_token'
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey)
    return !!token
  }

  getLoggedUser() {
    const token = localStorage.getItem(this.tokenKey)
    if (!!!token) return

    try {
      const decodedToken = jwtDecode(token);
      return decodedToken
    } catch (err) {
      return err
    }
  }
  
  // findUserByEmail(email: string): Observable<any> {
  //   const url = `${this.URL}/users?email=${email}`;
  //   return this.http.get<any>(url).pipe(
  //     catchError((error: any) => {
  //       console.error('Error en la solicitud de búsqueda de usuario:', error);
  //       return of(null); 
  //     })
  //   );
  // }
  findUserByEmail(email: string): Observable<any> {
    const url = `${this.URL}/users/${email}`;
    return this.http.get(url).pipe(
      catchError((error: any) => {
        console.error('Error en la solicitud:', error);
        return of(null); 
      })
    );
  }
  sendResetPasswordEmail(email: string): Observable<any> {
    const url = `${this.URL}/auth/reset-password`;
    return this.http.post<any>(url, { email }).pipe(
      catchError((error: any) => {
        console.error('Error en la solicitud:', error);
        return of(null); 
      })
    );
  }

  sendRequestToLogin(email: string, password: any) {
    const url = `${this.URL}/auth/login`;
    return this.http.post<any>(url, { email, password }).pipe(
      catchError((error: any) => {
        console.error('Error en la solicitud:', error);
        return of(null); 
      })
    );
  }
}

