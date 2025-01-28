import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private URL = 'http://localhost:3000/api';
  public itemsChanged$ = new Subject<any[]>();
  items: any[] = [];
  private hasFinishedOrder: boolean = false;
  totalAmount: number = 0;

  constructor(private http: HttpClient, private router: Router) {
    this.getItems();
  }

  private initializeCart() { // traigo el carrito y si no hay nada lo muestro vacio o si tiene, con las cosas que dejó el cliente comprando 
    const lsCart = localStorage.getItem('CART');
    if (!lsCart) {
      const emptyCart = { items: [], total: 0 };
      localStorage.setItem('CART', JSON.stringify(emptyCart));
      return emptyCart;
    }
    return JSON.parse(lsCart);
  }

  addToCart(product: any) {
    const lsCart = localStorage.getItem('CART');
    const CURRENT_CART = JSON.parse(lsCart as any) || { items: [] };
  
    const haveThisProduct = CURRENT_CART.items.find((x: any) => x.id === product.id);
    
    if (!haveThisProduct) { // CUANDO AGREGO EL PRODUCTO AL CARRITO
      CURRENT_CART.items.push({
        ...product,
        quantity: 1,
      });
  
      const NEW_CART = { total: 0, items: CURRENT_CART.items }; 
      localStorage.setItem('CART', JSON.stringify(NEW_CART)); // ACA ES COMO QUE TENGO EL CARRITO Y LO ACTUALIZO, ONDA LE AGREGO LOS PRODUCTOS SELECCIONADOS
  
      // NOTIFICAMOS CADA VEZ QUE SE AGREGA O YA ESTABA AGREGDO AL CARRITO
      this.items.splice(0, this.items.length, ...CURRENT_CART.items);
      this.notifyItemsChanged();
      alert('Producto agregado al carrito');
    } else {
      alert('Este producto ya está en tu carrito');
      return;
    }
  }
  

  getItems() {
    const CURRENT_CART = this.initializeCart();
    this.items = CURRENT_CART.items;
    return this.items;
  }

  clearCart() {
    this.items = [];
    localStorage.setItem('CART', JSON.stringify({ items: [], total: 0 }));
    this.notifyItemsChanged();
    return this.items;
  }

  removeFromCart(product: any) {
    const index = this.items.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.updateLocalStorage();
      this.notifyItemsChanged();
    }
  }
//ACA SE CALCULA EL TOTAL, Misma lógica, antes estaba en el cart.component.ts
  private calculateItemsTotal(): number {
    return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  calculateTotal(cityCharge: number): number {
    console.log("En el calculate,a ntes", this.totalAmount)
    this.totalAmount = this.calculateItemsTotal();
    console.log("En el calculate,despues", this.totalAmount)
    if (cityCharge !== 0) {
      console.log("En el calculate,a ntes recargo", this.totalAmount)
      this.totalAmount += this.totalAmount * (cityCharge / 100);
      console.log("En el calculate,despues recargo", this.totalAmount)
    }
    this.totalAmount = parseFloat(this.totalAmount.toFixed(2));
    this.updateLocalStorage();
    return this.totalAmount;
  }

  updateLocalStorage() {
    const cartData = { items: this.items, total: this.totalAmount };
    localStorage.setItem('CART', JSON.stringify(cartData));
  }

  notifyItemsChanged() {
    this.itemsChanged$.next(this.items);
  }  

  setOrderFinished(value: boolean) {
    this.hasFinishedOrder = value;
  }

  isOrderFinished(): boolean {
    return this.hasFinishedOrder;
  }

  getItemsOrder(): any[] {
    return this.items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
      unitPrice: item.price,
    }));
  }  
}
