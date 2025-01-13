import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  items: any[] = [];
  totalAmount: number = 0; 
  private destroy$ = new Subject<void>();

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.initializeCart();
    this.calculateTotal();

    this.cartService.itemsChanged$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.calculateTotal();
      });
  }

  ngOnDestroy() {
    // Liberar recursos al destruir el componente
    this.destroy$.next();
    this.destroy$.complete();
  }

  initializeCart() {
    this.items.forEach(item => {
      item.quantity = item.quantity || 1;
      item.totalAmount = 0; 
    });
  }

  incrementQuantity(item: any) {
    item.quantity++; 
    this.calculateTotal(); 
    console.log("le estoy mandando:",item.id,"compra")
  
    this.productService.updateStock(item.id,1,"compra").subscribe({
      next: (response) => {
        console.log("Stock actualizado:", response);
      },
      error: (err) => {
        console.error("Error al actualizar el stock:", err);
        alert("Error al actualizar el stock: " + (err?.error?.message || "Intenta nuevamente"));
        item.quantity--;
        this.calculateTotal();
      }
    });}

    decrementQuantity(item: any) {
      if (item.quantity > 0) {
        item.quantity--; 
        if (item.quantity === 0) {
          this.removeItem(item);
        }
        console.log("le estoy mandando:", item.id, "devuelve");
    
        this.productService.updateStock(item.id,1,"devuelve").subscribe({
          next: (response) => {
            console.log("Stock actualizado (decremento):", response);
          },
          error: (err) => {
            console.error("Error al actualizar el stock (decremento):", err);
            alert("Error al actualizar el stock: " + (err?.error?.message || "Intenta nuevamente"));
            item.quantity++;
            this.calculateTotal();
          }
        });
    
        this.cartService.updateLocalStorage(); //???? NO HAY NADA DE ESO 
        this.calculateTotal();
      }
    }
    

  removeItem(item: any) {  /// FIJARSE SI ACTUALIZA EL BACK DE NUEVO
    this.cartService.removeFromCart(item);

    this.productService.updateStock(item.id,item.quantity,"devuelve").subscribe({
      next: (response) => {
        console.log("Stock actualizado:", response);
      },
      error: (err) => {
        console.error("Error al actualizar el stock:", err);
        alert("Error al actualizar el stock: " + (err?.error?.message || "Intenta nuevamente"));
        item.quantity++;
        
      }
    });
    this.calculateTotal();}

  calculateTotal() {
    this.totalAmount = 0;
    this.items.forEach(item => {
      item.total = item.price * item.quantity;
      this.totalAmount += item.total;
    });
  }
}
