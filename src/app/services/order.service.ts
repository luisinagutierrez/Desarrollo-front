import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs'; 
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private URL = 'http://localhost:3000/api'; 

  constructor(  private http: HttpClient,
    private router: Router
  ) {}

  create(orderData: any): Observable<any> {
    const url = `${this.URL}/orders`; // URL para el endpoint de creación
    return this.http.post(url, orderData).pipe(
      catchError((error: any) => {
        console.error('Error creating order:', error);
        return throwError(error);
      })
    );
  }  
}



