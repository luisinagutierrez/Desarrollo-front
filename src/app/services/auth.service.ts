import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError  } from 'rxjs'; 
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = 'http://localhost:3000/api'
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}
  
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
    const url = `${this.URL}/auth/password/recovery`;
    return this.http.post<any>(url, { email }).pipe(
      catchError((error: any) => {
        console.error('Error en la solicitud:', error);
        return of(null); 
      })
    );
  }
}

