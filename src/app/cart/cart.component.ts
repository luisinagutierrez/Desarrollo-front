import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { CityService } from '../services/city.service';
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
    private router: Router,
    private cartService: CartService,
    private productService: ProductService,
    private authService: AuthService,
    private userService: UserService,
    private cityService: CityService
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
      console.log("en el calculate")
      this.totalAmount = 0;    
      this.items.forEach(item => {
        item.totalAmount = item.price * item.quantity;
        this.totalAmount += item.totalAmount;
      });
      console.log("el total a",this.totalAmount)
      // Asegúrate de incluir el recargo de ciudad
      if (this.cityCharge !== 0) {
        console.log("dentro del if")
        this.totalAmount += this.totalAmount * (this.cityCharge / 100);
      }
      console.log("el total a",this.totalAmount)
      // Actualiza el localStorage
      this.cartService.updateLocalStorage();
    }
    


  confirmPurchase() {
    this.calculateTotal();
    if (!this.userData) {
      Swal.fire({
        icon: 'error',
        title: 'Acción no permitida',
        text: 'Debes iniciar sesión para confirmar tu compra.',
      });
      return;
    }
  
    Swal.fire({
      title: '¿Desea enviar la compra a su dirección registrada?',
      text: `Dirección registrada: ${this.userData.street} ${this.userData.streetNumber}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, usar esta dirección',
      cancelButtonText: 'No, quiero cambiarla',
      confirmButtonColor: '#e7c633',
      cancelButtonColor: '#f76666',
    }).then((result) => {
      if (result.isConfirmed) {
        // Si elige usar la dirección registrada, actualizar el stock
        this.updateStock(this.items);
      } else {
        // Si elige cambiar la dirección, redirigir al componente de edición de datos
        Swal.fire({
          icon: 'info',
          title: 'Redirigiendo',
          text: 'Por favor, actualice su dirección.',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          this.router.navigate(['UserInformation']);
        });
      }
    });
  }
  
  updateStock(items: any[]) {
    let allInStock = true; // Verificar que todos los productos sigan teniendo stock suficiente
  
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
  
    if (allInStock && this.userData) { 
      this.calculateTotal();
      items.forEach(item => {
        this.productService.updateStock(item.id, item.quantity).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Muchas gracias por su compra',
              text: `La compra se ha concretado con éxito.`,
            }).then(() => {
              this.cartService.clearCart();
              this.items = [];
              this.totalAmount = 0;
              this.router.navigate(['/']);
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

  if (user) {
    this.userService.findUserByEmail(user.email).subscribe({
      next: (data) => {
        console.log("Esta en el data:", data); // Debugging log
        this.userData = data.data;
        console.log("lo que est;a en el data dara", this.userData)
        console.log("Lo que me trae el inf:", this.userData.city);

        this.cityService.findOne(this.userData.city).subscribe({
          next: (city) => {
            console.log("Esta en el data:", city); // Debugging log

            console.log("el surcharge", city.data.surcharge); // es necesario dejar el data, por cómo la API devuelve 

            if (city && city.data.surcharge !== undefined) {
              this.cityCharge = city.data.surcharge;
              this.calculateTotal()

              console.log("City surcharge actualizado:", this.cityCharge);
            } else {
              console.error("City no contiene un surcharge válido:", city);
            }
          },
          error: (err) => {
            console.error("Error cargando datos de la ciudad:", err);
          },
        });
      },
      error: (err) => {
        console.error("Error al buscar usuario por email:", err);
      },
    });
  } else {
    console.error("No se encontró un usuario logueado.");
  }
}
}