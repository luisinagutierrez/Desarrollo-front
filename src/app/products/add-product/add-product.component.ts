import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { AuthService } from 'src/app/services/auth.service.js';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit { // Implementa OnInit
    

  constructor(
    private productService: ProductService,
    private router: Router,
    //private authService: AuthService,
    //private supplierService: SupplierService,
  ) {}

  ngOnInit(): void {
    //this.authService.checkAuthAndRedirect();
    //this.getSuppliers();
  }


  // onImageSelected(event: Event) {
  //   const inputElement = event.target as HTMLInputElement;
  //   if (inputElement.files && inputElement.files[0]) {
  //     this.product.image = inputElement.files[0];
  //   } else if ( this.product.image = null) 
  //   {
  //     console.log('No se seleccionó ninguna imagen');
  //   }
  // }
  // // Guardar el producto en la base de datos
    add(addForm: NgForm) {  
        const newProduct = addForm.value;
        console.log(newProduct);
        
  
    
    // if (this.product.image) {
    //   formData.append('image', this.product.image);
    // }

    this.productService.add(newProduct)
      .subscribe(
        (res:Response) => {
          console.log(res);
          Swal.fire(
            'Producto creado con éxito!!',
            '',
            'success'
          );
        },
        (err: Error) => {
          console.log(err);
          
          Swal.fire({
            icon: 'error',
            title: 'Registro fallido',
            text: err.message,
          });
        }
      );
      
  }
}
function subscribe(arg0: (res: Response) => void, arg1: (err: Error) => void) {
  throw new Error('Function not implemented.');
}

