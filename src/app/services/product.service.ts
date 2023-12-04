import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable , of  } from 'rxjs';
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

  add(productData: any): Observable<any> { 
    return this.http.post<any>(this.URL + '/products', productData);
  }

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.URL + '/products');
  }

  delete(productId: any) {
    const deleteUrl = `${this.URL}/products/${productId}`;
    return this.http.delete(deleteUrl);
  }

  update(product: any): Observable<any> {
    const updateUrl = `${this.URL}/products/${product.id}`;
   return this.http.patch<any>(updateUrl, product);
  }

  findProductByName(name: string): Observable<any> {
    const url = `${this.URL}/products/${name}`;
    return this.http.get(url).pipe(
      catchError((error: any) => {
        console.error('Error en la solicitud:', error);
        return of(null); 
      })
    );
  }

}