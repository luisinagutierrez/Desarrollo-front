import { Injectable } from '@angular/core';
import { BodyComponent } from '../body/body.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class CartService {

  private URL = 'http://localhost:3000/api'; 

  items: any[] =[];

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  addToCart(product: any) {
    this.items.push(product);
  }

  getItems() {
    return this.items;
  }

  clearCart() {
    this.items = [];
    return this.items;
}
}
