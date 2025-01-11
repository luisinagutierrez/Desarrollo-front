import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs'; 
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private URL = 'http://localhost:3000/api'; 

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}


  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.URL + '/users');
  }

  signUp(userData: any): Observable<any> { 
    return this.http.post<any>(this.URL + '/users', userData);
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
  updatePassword(email: string, password: string): Observable<any> {
    const url = `${this.URL}/users/update-password`;
    return this.http.put<any>(url, { email, password }).pipe(
      catchError((error: any) => {
        console.error('Error al actualizar contraseña:', error);
        return of(null); 
      })
    );
  }
}
