import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  items: any[] = [];
  totalAmount: number = 0; 
  private destroy$ = new Subject<void>();
  showConfirmButton: boolean = false
  apiUrl = environment.apiUrl;
  userData: any = null; // Datos del usuario logueado
  cityCharge: number = 0;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private authService: AuthService,
    private userService: UserService
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
      this.showConfirmButton = this.cartService.isOrderFinished();
      this.loadUserData();
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
        Swal.fire({
          icon: 'error',
          title: 'Lo sentimos',
          text: `No hay stock suficiente para el producto ${item.name}`,
        });
      }
    });
  }
  
  removeItem(item: any) {  
    this.cartService.removeFromCart(item);
    this.calculateTotal();}

  calculateTotal() {
    this.totalAmount = 0;
    this.items.forEach(item => {
      item.totalAmount = item.price * item.quantity;
      this.totalAmount += item.totalAmount;
      // HAY QUE ACTULIZAR EL TOTAL AMOUNT
      this.cartService.updateLocalStorage()
    });
    if (this.cityCharge) {
      this.totalAmount += this.totalAmount*this.cityCharge/100;
      this.cartService.updateLocalStorage()
    }
  }

 updateStock(items: any[]) {
  if (!this.userData) { 
    Swal.fire({
      icon: 'error',
      title: 'Acción no permitida',
      text: 'Debes iniciar sesión para confirmar tu compra.',
    });
    return;}

  let allInStock = true; // tenemos que verificar que todos sigan teniendo stock suficiente Iguaaaal en el back del update si se verifica si hay cantidad suficiente, quiza hacer todo esto denuevo no haga falta pero bueno, es como que está recontra validado el tema de la cantidad tanto en el front como en el back
  items.forEach(item => {
    this.productService.verifyStock(item.id, item.quantity).subscribe({
      next: () => {
        console.log(`Hay stock suficiente para ${item.name} (cantidad: ${item.quantity})`);
      },
      error: (err) => {
        allInStock = false; 
        const errorMessage = err?.error?.message || `No hay stock suficiente para ${item.name}`;
        Swal.fire({
          icon: 'error',
          title: 'Stock insuficiente',
          text: errorMessage,
        });
      }
    });
  });

  if (allInStock && this.userData) { //acá s0lo va a poder entrar si tenemos todos los productos con stock 
    items.forEach(item => {
      this.productService.updateStock(item.id, item.quantity).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Muchas gracias por su compra',
            text: `La compra se ha concretado con éxito.`,
          });
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Lo sentimos',
            text: `No hay stock suficiente para el item ${item.name}`,
          });
        }
      });
    });
  }
}


  loadUserData(): void {
    const user = this.authService.getLoggedUser();
    console.log("Estoy en loadUserData, y este es el user:", user);
    console.log("Estoy en el loadUserData y este es el mail que le mando", user.email);

    if (user.email) {
      this.userService.findUserByEmail(user.email).subscribe({
        next: (data) => {
          console.log("Esta es la data del user:", data); // Debugging log
          this.userData = data.data;
          console.log("lo que me trae el inf",this.userData.city.surcharge)

          if (this.userData?.city?.surcharge) {
            this.cityCharge = this.userData.city.surcharge;
            console.log(`Recargo de la ciudad: ${this.cityCharge}`);
            
          } else {
            console.warn('No se encontró el recargo de la ciudad');
            this.cityCharge = 0; // por si no llegara a tener
          }
          this.calculateTotal();
          
        },
        error: (err) => {
          console.error('Error loading user data:', err);
        }
      });
    } else {
      console.error('No logged in user found');
    }
  }

}

