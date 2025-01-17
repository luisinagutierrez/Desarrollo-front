import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode'

type DecodeUserPayload = {
  email: string,
  privilege: string
  iat: number
  exp: number
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = 'http://localhost:3000/api'
  private tokenKey = 'access_token'

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.checkToken());
  private isAdminInSubject = new BehaviorSubject<boolean>(this.checkAdmin());

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  isAdmin$(): Observable<boolean> {
    return this.isAdminInSubject.asObservable();
  }

  private checkToken(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token;
  }

  private checkAdmin(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    if (!!!token) return false

    try {
      const decodedToken = jwtDecode(token) as DecodeUserPayload;
      return decodedToken.privilege === 'administrador'
    } catch (err) {
      return false
    }
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  isAdmin(): boolean {
    return this.isAdminInSubject.value;
  }

  getLoggedUser(): DecodeUserPayload | any {
    const token = localStorage.getItem(this.tokenKey)
    if (!!!token) return

    try {
      const decodedToken = jwtDecode(token);
      return decodedToken as DecodeUserPayload
    } catch (err) {
      return err
    }
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.isLoggedInSubject.next(true);
    this.isAdminInSubject.next(this.checkAdmin());
    this.checkAdmin()
    this.router.navigate(['/']);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedInSubject.next(false);
    this.isAdminInSubject.next(false);
    this.router.navigate(['/UserRegistration']);
  }
  
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
    const url = `${this.URL}/auth/password/recovery`;
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

