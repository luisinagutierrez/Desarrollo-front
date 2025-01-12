import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable , of, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private URL = 'http://localhost:3000/api'; 

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  add(productData: FormData): Observable<any> { 
    return this.http.post<any>(`${this.URL}/products`, productData);
  }

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}/products`);
  }

  delete(productId: string): Observable<any> {
    return this.http.delete(`${this.URL}/products/${productId}`);
  }

  update(product: any): Observable<any> {
    return this.http.put(`${this.URL}/products/${product.id}`, product).pipe(
      catchError((error: any) => {
        console.error('Error en la solicitud de actualización:', error);
        return throwError(error); 
      })
    );
  }

  findProductByName(name: string): Observable<any> {
    const url =`${this.URL}/product/${name}`;
    return this.http.get(url).pipe(
      catchError((error: any) => {
        console.error('Error en la solicitud:', error);
        return of(null); 
      })
    );
  }

  searchProducts(query: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/products/search?query=${encodeURIComponent(query)}`).pipe(
      catchError((error: any) => {
        console.error('Error searching products:', error);
        return throwError(error);
      })
    );
  }

}