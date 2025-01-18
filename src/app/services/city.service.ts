import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError  } from 'rxjs'; 
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  private URL = 'http://localhost:3000/api'; 
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}
  
  add(cityData: any): Observable<any> { 
    return this.http.post<any>(this.URL + '/cities', cityData);
  }
  
  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.URL + '/cities');
  }
  
  delete(cityId: any) {
    const deleteUrl = `${this.URL}/cities/${cityId}`;
    return this.http.delete(deleteUrl);
  }
  
  update(city: any): Observable<any> {
    const url = `${this.URL}/cities/${city.id}`;
    return this.http.put(url, city).pipe(
      catchError((error: any) => {
        console.error('Error en la solicitud de actualización:', error);
        return throwError(error); 
      })
    );
  }
  

  findCityByPostCode(postCode: string): Observable<any> {
    const url =`${this.URL}/cities/postCode/${postCode}`;
    return this.http.get(url).pipe(
      catchError((error: any) => {
        console.error('Error en la solicitud:', error);
        return of(null); 
      })
    );
  }

  /*findCitiesByProvince(provinceId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.URL}/cities/${provinceId}`).pipe(
      map(response => Array.isArray(response) ? response : []),
      catchError((error: any) => {
        console.error('Error fetching cities:', error);
        return of([]);
      })
    );
  }*/

  findCityById(cityId: string): Observable<any> {
    const url = `${this.URL}/cities/${cityId}`;
    return this.http.get(url).pipe(
      catchError((error: any) => {
        console.error('Error fetching city:', error);
        return of(null); 
      })
    );
  }
}

