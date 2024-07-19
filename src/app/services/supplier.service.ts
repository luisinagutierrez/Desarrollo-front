import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs'; 
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private URL = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  add(supplierData: any): Observable<any> {
    return this.http.post<any>(this.URL + '/suppliers', supplierData);
  }

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.URL + '/suppliers');
  }

  delete(supplierId: any) {
    const deleteUrl = `${this.URL}/suppliers/${supplierId}`;
    return this.http.delete(deleteUrl);
  }

  update(supplier: any): Observable<any> {
    const url = `${this.URL}/suppliers/${supplier.id}`;
    return this.http.put(url, supplier).pipe( // lo volví a poner en put pq cambiamos todos los datos (antes habíamos dejado el cuit como fijo)
      catchError((error: any) => {
        console.error('Error:', error);
        return throwError(error); 
      })
    );
  }
  
  findSupplierByCuit(cuit: number): Observable<any> {
    const url =`${this.URL}/supplier/${cuit}`;
    return this.http.get(url).pipe(
      catchError((error: any) => {
        console.error('Error en la solicitud findOne:', error); // si no lo encuentra tira el 404 
        return of(null);  // se le asigna el valor para despues compara en el .ts 
      })
    );
  }
  
  findProductsBySupplier(cuit: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}/suppliers/products/${cuit}`);
  }  
}
