import { Injectable } from '@angular/core';
    import { HttpClient } from '@angular/common/http';
    import { Router } from '@angular/router';
    import { Observable } from 'rxjs';
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
      const updateUrl = `${this.URL}/suppliers/${supplier.id}`;
      return this.http.patch<any>(updateUrl, supplier);
    }
}