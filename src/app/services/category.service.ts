import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
//import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private URL = 'http://localhost:3000/api';
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getCategories(): Observable<any> {
    return this.http.get<any[]>(this.URL + '/categories');
  }

  //luego hacer los add, delete and update requeridos
  //hice solo el findall para agregar en producto
}
