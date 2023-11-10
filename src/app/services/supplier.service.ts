import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private URL = 'http://localhost:3000/api';

  constructor(    
    private http: HttpClient,
    private router: Router
    ) { }

    add(supplier: any): Observable<any>{
      return this.http.post<any>(this.URL + '/add', supplier);
    };

    getSupplierCuit(cuit: string): Observable<any>{
      console.log(cuit);
      return this.http.get<any>(this.URL + `/suppliers/${cuit}`).pipe(
        map((res: any)=>{
          if(res && res.cuitExists != null){
            return res;
          }
          return {cuitExists: false};
        }),
        catchError((err) => {
          console.log(err);
          return of({cuitExists: false});
        })
      );
    }

    deleteSupplier(id: string): Observable<any>{
      const url = `${this.URL}/delete/${id}`;
      return this.http.delete<any>(url);
    }

    updateDetails(id: string, details:{businessName: string, email: string, phone: string}):Observable<any>{
      const url = `${this.URL}/update/${id}`;
      return this.http.patch<any>(url, details);
    };

    getSuppliers(): Observable<any>{
      return this.http.get<any>(this.URL + '/suppliers');
    };
}
