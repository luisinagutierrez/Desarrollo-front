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
  ) {
    this.getItems()
  }

  addToCart(product: any) {
    const lsCart = localStorage.getItem('CART');
    const CURRENT_CART = JSON.parse(lsCart as any)

    const hasThisProduct = CURRENT_CART.items.find((x: any) => x.id === product.id)
    if(!!!hasThisProduct) { // ESTE PRODUCTO NO EXISTE EN EL CARRITO
      CURRENT_CART.items.push({
        ...product,
        quantity: 1
      }) // LO AÑADO A MIS ITEMS

      const NEW_CART = { total: 0, items: CURRENT_CART.items } // EL TOTAL DEBERIA SER DINAMICO, DEBEN HACER LA SUMA DEL TOTAL A MEDIDA QUE AGREGAN ITEMS
      localStorage.setItem('CART', JSON.stringify(NEW_CART)) // ACTUALIZO MI STORAGE
      this.items.push(CURRENT_CART.items); // ACTUALIZO MI ESTADO DE ITEMS

      return
    }

    // ESTE PRODUCTO EXISTE EN EL CARRITO
    const index = CURRENT_CART.items.findIndex((x: any) => x.id === product.id) // BUSCO SU INDICE
    const updatedProduct = {
      ...hasThisProduct,
      quantity: hasThisProduct.quantity++
    } // LO MANTENGO EN MIS ITEMS PERO LE SUMO 1 DE QUANTITY

    const newItems = CURRENT_CART.items.slice( index, 1 ) // QUITO ESE ITEM PARA ACTUALIZAR SU CANTIDAD
    CURRENT_CART.items.push( updatedProduct ) // LO AGREGO CON LA NUEVA QUANTITY

    const NEW_CART = { total: 0, items: newItems }
    localStorage.setItem('CART', JSON.stringify(NEW_CART))
    this.items.push(newItems);
  }

  getItems() {
    const lsCart = localStorage.getItem('CART');
    if (!!!lsCart) localStorage.setItem('CART', JSON.stringify({ items: [], total: 0 }));

    const CURRENT_CART = JSON.parse(lsCart as any)
    // IDEAL ESTO DEBERIA SER UN JSON CON UN FORMATO SIMILAR A ESTE
    // {
    //   discounts: {},
    //   items: [], // un array con los items agregados, es decir, los productos
    //   subtotal: 0,
    //   total: 0
    // }
    // SOLO A MODO DE EJEMPLO, PUEDEN PONERLE AL OBJETO LAS PROPIEDADES QUE USTEDES QUIERAN

    if (CURRENT_CART?.items.length <= 0) return this.items = []

    return this.items = CURRENT_CART.items;
  }

  clearCart() {
    this.items = [];

    const lsCart = localStorage.getItem('CART');
    lsCart && localStorage.setItem('CART', JSON.stringify({ items: [], total: 0 }));

    return this.items;
  }

  updateLocalStorage() {
    const cartData = { items: this.items, total: 0 };
    localStorage.setItem('CART', JSON.stringify(cartData));
  }

  removeFromCart(product: any) {
    const index = this.items.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.updateLocalStorage();
    }
  }

  
}
