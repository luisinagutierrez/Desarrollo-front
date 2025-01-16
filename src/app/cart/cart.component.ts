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
  verifyStock(item: any, operation: string) {
    const newQuantity = operation === 'compra' ? item.quantity + 1 : item.quantity - 1; // revisar funcionamiento 
  
    if (newQuantity < 1) {
      return this.removeItem(item); 
    }
  
    this.productService.verifyStock(item.id, newQuantity).subscribe({
      next: () => {
        item.quantity = newQuantity;
        console.log("lo que va a tener ahora el item", item.name, item.quantity)
        this.calculateTotal();
        this.cartService.updateLocalStorage()
      },
      error: (err) => {
        const errorMessage = err?.error?.message || 'Error al verificar el stock';
        alert(errorMessage);
      }
    });
  }
  
  removeItem(item: any) {  
    this.cartService.removeFromCart(item);
    this.calculateTotal();}

  calculateTotal() {
    this.totalAmount = 0;
    this.items.forEach(item => {
      item.total = item.price * item.quantity;
      this.totalAmount += item.total;
      console.log("item + canitdad + total", item.name, item.quantity,item.price) /// 
    });
  }
}
