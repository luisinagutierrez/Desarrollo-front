import { Component, Input } from '@angular/core';
//import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal
import { ProductService } from 'src/app/services/product.service.js';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  product = {
    description: '',
    stock: '',
    name: '',
    price: '',
    image: null as File | null ,
    category: '',
    supplier: ''
  }

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  onImageSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files[0]) {
      this.product.image = inputElement.files[0];
    }
  }

  // Guardar el producto en la base de datos
  createNewProduct() {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('description', this.product.description);
    formData.append('stock', this.product.stock);
    formData.append('price', this.product.price);
    formData.append('category', this.product.category);
    formData.append('supllier', this.product.supplier);
    if (this.product.image) {formData.append('image', this.product.image);}

    this.productService.createNewProduct(formData) 
      .subscribe(
        res => {
          console.log(res);
          Swal.fire(
            'Producto creado con éxito!!',
            '',
            'success'
          );
        },
        (err) => {
          console.log(err);
          
          Swal.fire({
            icon: 'error',
            title: 'Registro fallido',
            text: err.error,
          });
        }
      );

    this.product.name = '';
    this.product.description = '';
    this.product.price = '';
    this.product.stock = '';
    this.product.image = null;
    this.product.category = '';
    this.product.supplier = '';
  }

}
