import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BodyComponent } from '../body/body.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartComponent } from '../cart/cart.component'

@Injectable({
  providedIn: 'root'
})

export class CartService {

  private URL = 'http://localhost:3000/api';
  public itemsChanged$ = new Subject<void>();
  items: any[] =[];
  private hasFinishedOrder: boolean = false; 

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.getItems()
  }

  addToCart(product: any) {
    const lsCart = localStorage.getItem('CART');
    const CURRENT_CART = JSON.parse(lsCart as any)

    const haveThisProduct = CURRENT_CART.items.find((x: any) => x.id === product.id)
    if(!!!haveThisProduct) { // ESTE PRODUCTO NO EXISTE EN EL CARRITO
      CURRENT_CART.items.push({
        ...product,
        quantity: 1
      }) // LO AÑADO A MIS ITEMS

      const NEW_CART = { total: 0, items: CURRENT_CART.items } // EL TOTAL DEBERIA SER DINAMICO, DEBEN HACER LA SUMA DEL TOTAL A MEDIDA QUE AGREGAN ITEMS
      localStorage.setItem('CART', JSON.stringify(NEW_CART)) // ACTUALIZO MI STORAGE
      console.log(CURRENT_CART.items);
      this.items.splice(0, this.items.length, ...CURRENT_CART.items); // ACTUALIZO MI ESTADO DE ITEMS
      this.notifyItemsChanged()

      return
    }

    // ESTE PRODUCTO EXISTE EN EL CARRITO
    const index = CURRENT_CART.items.findIndex((x: any) => x.id === product.id) // BUSCO SU INDICE
    const updatedProduct = {
      ...haveThisProduct,
      quantity: haveThisProduct.quantity++
    } // LO MANTENGO EN MIS ITEMS PERO LE SUMO 1 DE QUANTITY

    const newItems = CURRENT_CART.items.slice( index, 1 ) // QUITO ESE ITEM PARA ACTUALIZAR SU CANTIDAD
    CURRENT_CART.items.push( updatedProduct ) // LO AGREGO CON LA NUEVA QUANTITY

    const NEW_CART = { total: 0, items: newItems }
    localStorage.setItem('CART', JSON.stringify(NEW_CART))
    this.items.push(newItems);

    this.notifyItemsChanged()
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
    // SOLO A MODO DE EJEMPLO, PODEMOS PONERLE AL OBJETO LAS PROPIEDADES QUE QUERAMOS

    if (CURRENT_CART?.items.length <= 0) return this.items = []

    return this.items = CURRENT_CART.items;
  }

  clearCart() {
    this.items = [];

    const lsCart = localStorage.getItem('CART');
    lsCart && localStorage.setItem('CART', JSON.stringify({ items: [], total: 0 }));
    this.notifyItemsChanged()

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

  notifyItemsChanged() { // SE DEBE LLAMAR CADA VEZ QUE THIS.ITEMS SUFRIRA ALGUN CAMBIO - creo q nunca lo llamamos, si a updatelocalstorage, podríamos hacer que ese lo llame no?? -luli
    this.itemsChanged$.next();
  }
  setOrderFinished(value: boolean) {
    this.hasFinishedOrder = value; // Actualiza el estado
  }

  isOrderFinished(): boolean {
    return this.hasFinishedOrder; // Retorna el estado
  }
}
