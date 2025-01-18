import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Asegúrate de incluir esto
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

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');  // Obtener el token
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);  // Agregar el token al encabezado
    }
    return headers;
  }
  

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.URL + '/users');
  }

  signUp(userData: any): Observable<any> { 
    return this.http.post<any>(this.URL + '/users', userData);
  }

findUserByEmail(email: string): Observable<any> {
  const url = `${this.URL}/users/${email}`; // Ruta corregida
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

    deleteUser(email: string): Observable<void> {

    return this.http.delete<void>(`${this.URL}/email/${email}`);

  }

  updateUser(user: any): Observable<any> {
    const updateUrl = `${this.URL}/users/${user.id}`;
    return this.http.patch<any>(updateUrl, user);
  }
}
