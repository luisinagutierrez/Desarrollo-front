import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
//import { AuthService } from 'src/app/services/auth.service.js';
import { NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { SupplierService } from 'src/app/services/supplier.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit { // Implementa OnInit
    
  categories: any[] = [];
  suppliers: any[] = [];
  constructor(
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService,
    //private authService: AuthService,
    private supplierService: SupplierService,
  ) {}

  ngOnInit(): void {
    //this.authService.checkAuthAndRedirect();
    //this.getSuppliers();
    this.getCategories();
    this.getSuppliers();
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
  getCategories(){
    this.categoryService.getCategories().subscribe((data:any)=>{
      console.log('Date received', data);
      this.categories = data.data;
      console.log(this.categories);
    }, (error)=>{
      console.error('Error fetching categories', error);
    });
  }

  getSuppliers(){
    this.supplierService.getSuppliers().subscribe((data:any)=>{
      console.log('Date received', data);
      this.suppliers = data.data;
      console.log(this.suppliers);
    }, (error)=>{
      console.error('Error fetching suppliers', error);
    });
  }

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

