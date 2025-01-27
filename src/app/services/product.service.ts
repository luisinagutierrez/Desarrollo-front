import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable , of, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private URL = 'http://localhost:3000/api';
  private productsSubject = new BehaviorSubject<any[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadProducts();
  }

  private loadProducts() {
    this.findAll().subscribe((response:any)=> {
      this.productsSubject.next(response.data);});
  }

  add(productData: FormData): Observable<any> { 
    return this.http.post<any>(`${this.URL}/products`, productData).pipe(tap(() => this.loadProducts()));
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
    const url =`${this.URL}/products/${name}`;
    return this.http.get(url).pipe(
      catchError((error: any) => {
        console.error('Error en la solicitud:', error);
        return of(null); 
      })
    );
  }

// ESTO ESTABA EN EL FEATURE/CART
  searchProducts(query: string): Observable<any> {
    return this.http.get<any>(`${this.URL}/products/search?query=${encodeURIComponent(query)}`).pipe(
      catchError((error: any) => {
        console.error('Error searching products:', error);
        return throwError(error);
      })
    );
  }

// ESTO ESTABA EN EL MAIN
  verifyStock(productId: string, quantity: number): Observable<any> {
  return this.http.get(`${this.URL}/products/${productId}/verify-stock?quantity=${quantity}`);
} 
/// le paso el id directamente en vez de tooodo el producto
updateStock(productId: string, quantity: number): Observable<any> {
  return this.http.put(`${this.URL}/products/${productId}/quantity`, { quantity }).pipe(
    catchError((error: any) => {
      console.error('Error en la solicitud de actualización de stock:', error);
      return throwError(error); 
    })
  );
}

}