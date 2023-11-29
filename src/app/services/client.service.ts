import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Router } from '@angular/router';
  import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private URL = 'http://localhost:3000/api'; 
  
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}
  
  add(clientData: any): Observable<any> { 
    return this.http.post<any>(this.URL + '/clients', clientData);
  }
  
  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.URL + '/clients');
  }
  
  delete(clientId: any) {
    const deleteUrl = `${this.URL}/clients/${clientId}`;
    return this.http.delete(deleteUrl);
  }
  
  update(client: any): Observable<any> {
    const updateUrl = `${this.URL}/clients/${client.id}`;
    return this.http.put<any>(updateUrl, client);
  }

}


