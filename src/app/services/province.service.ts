import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs'; 
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {
  private URL = 'http://localhost:3000/api'; 

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  add(provinceData: any): Observable<any> { 
    return this.http.post<any>(this.URL + '/provinces', provinceData);
  }

  findAll(): Observable<any[]> {
    return this.http.get<any>(this.URL + '/provinces').pipe(
      map(response => Array.isArray(response) ? response : response.data || [])
    );
  }

  delete(provinceId: any) {
    const deleteUrl = `${this.URL}/provinces/${provinceId}`;
    return this.http.delete(deleteUrl); 
  }

  update(province: any): Observable<any> {
    const updateUrl = `${this.URL}/provinces/${province.id}`;
    return this.http.patch<any>(updateUrl, province);
  }

findProvinceByName(name: string): Observable<any> {
  const url =`${this.URL}/provinces/${name}`;
  return this.http.get(url).pipe(
    catchError((error: any) => {
      console.error('Error en la solicitud:', error);
      return of(null); 
    })
  );
  
}

  findCitiesByProvince(id: string): Observable<any[]> {
    return this.http.get<any>(`${this.URL}/provinces/cities/${id}`).pipe(
      map(response => Array.isArray(response) ? response : response.data || []),
      catchError((error: any) => {
        console.error('Error fetching cities:', error);
        return of([]);
      })
    );
  }
  }