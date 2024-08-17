import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; 
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
//import { AuthService } from 'src/app/services/auth.service.js';
import { NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { SupplierService } from 'src/app/services/supplier.service';



// revisar pq repite todo dos veces al final 
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit { 
    
  categories: any[] = [];
  suppliers: any[] = [];
  selectedImage: File | null = null
  imagePreviewUrl: string | ArrayBuffer | null = null; // Agregado para vista previa de la imagen

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


  onImageSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      this.selectedImage = inputElement.files[0];

      const reader = new FileReader(); // esto te deja ver la vista previa de la imagen
      reader.onload = () => {
        this.imagePreviewUrl = reader.result; 
      };
      reader.readAsDataURL(this.selectedImage);
    } else {
      console.log('No se seleccionó ninguna imagen');
    }
  }
  
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

    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        newProduct.image = reader.result; // Base64 encoding de la imagen

        this.productService.findProductByName(newProduct.name)
          .subscribe(
            (existingProduct: any) => {
              if (existingProduct === null) {
                this.productService.add(newProduct).subscribe(
                  (response: any) => {
                    Swal.fire(
                      'Producto registrado con éxito!!',
                      '',
                      'success'
                    );
                  },
                  (err: any) => {
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
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error en la verificación del nombre.',
              });
            }
          );
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }
}