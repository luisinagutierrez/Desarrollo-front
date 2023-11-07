import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = 'http://localhost:3000/api';
  private _userPrivilege: string | null = null;
  get userPrivilege(): string | null {
    return this._userPrivilege;
  
  }

  constructor(private http: HttpClient) {}

  // logIn(email: string, password: string): Observable<{ token: string }> {
  //   return this.http.post<{ token: string }>(this.URL, { email, password });
  // }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

}

