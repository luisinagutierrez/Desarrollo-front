import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';
import { UserStateService } from './user-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = 'http://localhost:3000/api'; //agrego /auth?
  private _userRole: string | null = null;
  get userRole(): string | null {
    return this._userRole;
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private userStateService: UserStateService
  ) { }

  signUp(user: any){
    return this.http.post<any>(this.URL + '/signup', user);
  }

  logIn(user: any): Observable<any> {
    return this.http.post<any>(this.URL + '/login', user).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        this._userRole = res.role;
        this.userStateService.userRole = res.role;
      }) 
      );
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  deleteUser(userId:string){
    const url = `${this.URL}/deleteUser/${userId}`;
    return this.http.delete(url);
  }

  assignPrivileges(userId:string){
    const url = `${this.URL}/assignPrivileges/${userId}`;
    return this.http.patch(url, {role: 'admin'});
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('cartItems');
    this.router.navigate(['/login']);
  }

  getUserData(): Observable<any>{
    const authToken = this.getToken();

    if(!authToken){
      return new Observable((observer) => {
        observer.error('No hay token');
    });
  }
  const headers = {
    Authorization: 'Bearer ' + authToken,
  };
  return this.http.get<any>(this.URL + '/user', {headers});
  }

  async getClientDni(dni: number, authToken: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    console.log('Este es el DNI ingresado', dni);
    
this.http.get<any>(this.URL + `/user/${dni}`, { headers }).subscribe(
  {
     next:response => {
              if (response) {
                console.log('Cliente encontrado:', response);
                const cliente = response;
                resolve(cliente); 
            } else {
                console.log('Cliente no encontrado');
                reject('Cliente no encontrado'); 
                   }
            },
        error:error => {
                  console.error('Error en la solicitud HTTP', error);
                  reject(error);
        }
  });

});

}

// async getClientEmail(dni: string, authToken: string): Promise<any> {
//   return new Promise((resolve, reject) => {
//     const headers = {
//       Authorization: `Bearer ${authToken}`,
//     };
//     console.log('Este es el DNI ingresado', dni);
    
//     this.http.get<any>(this.URL + `/user/${dni}`, { headers }).subscribe(

//       {
//         next:response => {
//           if (response) {
//           console.log('Cliente encontrado:', response);
//           const cliente = response;
//            resolve(cliente); 
//         } else {
//            console.log('Cliente no encontrado');
//            reject('Cliente no encontrado');
//          }
//         },
//         error:error => {
//           console.error('Error en la solicitud HTTP', error);
//           reject(error);
//         }
//       }

//     );
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  checkAuthAndRedirect(): void {
    if (!this.isAuthenticated()) {
      this.router.navigate(['/login']);
    }
  }
}


