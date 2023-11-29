import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Router } from '@angular/router';
  import { Observable } from 'rxjs';

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
    const updateUrl = `${this.URL}/cities/${city.id}`;
    return this.http.put<any>(updateUrl, city);
  }

  }

