import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; 
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
  
  getCategories(){
    this.categoryService.findAll().subscribe((data:any)=>{
      console.log('Date received', data);
      this.categories = data.data;
      console.log(this.categories);
    }, (error)=>{
      console.error('Error fetching categories', error);
    });
  }

  getSuppliers(){
    this.supplierService.findAll().subscribe((data:any)=>{
      console.log('Date received', data);
      this.suppliers = data.data;
      console.log(this.suppliers);
    }, (error)=>{
      console.error('Error fetching suppliers', error);
    });
  }

  add(addForm: NgForm) {  
    const newProduct = addForm.value;
    newProduct.name = newProduct.name.charAt(0).toUpperCase() + newProduct.name.slice(1).toLowerCase();
      console.log(newProduct.name);
      this.productService.findProductByName(newProduct.name)
      .subscribe(
        (existingProduct: any) => {
          console.log(existingProduct);
          if (existingProduct === null) {
          this.productService.add(newProduct).subscribe(
          (response: any) => {
            console.log(response);
            Swal.fire(
            'Producto registrado con éxito!!',
            '',
            'success'
            );
          },
          (err: any) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Registro fallido',
              text: err.message,
              });
            }
          );
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El nombre ya está registrado',
          });
        }      
      },
      (err: any) => {
        console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error en la verificación del nombre.',
          });
        }
      );
      }
    }



