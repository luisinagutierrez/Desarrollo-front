import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private URL = 'http://localhost:3000/api';
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  add(categoryData: any): Observable<any> { 
    return this.http.post<any>(this.URL + '/categories', categoryData);
  }

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.URL + '/categories');
   }

  delete(categoryId: any) {
    const deleteUrl = `${this.URL}/categories/${categoryId}`;
    return this.http.delete(deleteUrl); 
  }

  update(category: any): Observable<any> {
    const updateUrl = `${this.URL}/categories/${category.id}`;
    return this.http.put<any>(updateUrl, category);
  }

  findProductsByCategory(name: string): Observable<any[]> {
    // const findProductsByCategoryUrl = `${this.URL}/categories/${name}`;
    return this.http.get<any[]>(this.URL + '/categories/' + name);
  }
}
