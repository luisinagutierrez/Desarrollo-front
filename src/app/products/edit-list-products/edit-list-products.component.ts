import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SupplierService } from 'src/app/services/supplier.service';
import { FilterProductsSupplierService } from 'src/app/services/filter-products-supplier.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-edit-list-products',
  templateUrl: './edit-list-products.component.html',
  styleUrls: ['./edit-list-products.component.scss']
})
export class EditListProductsComponent {
  products: any[] = [];
  suppliers: any[] = [];
  apiUrl = environment.apiUrl;
  
    constructor(
      private productService: ProductService,
      private route: ActivatedRoute,
      private router: Router,
      private supplierService: SupplierService,
      private filterProductsSupplierService: FilterProductsSupplierService,
    ) {}
  
  ngOnInit() {
    this.getSuppliers();
    /*this.productService.findAll().subscribe((data: any) => {
    console.log(data);
    this.products = data.data;
  });*/
    this.productService.products$.subscribe((data: any) => {
      this.products = data;
    });

    this.filterProductsSupplierService.supplierSelected$.subscribe(async (cuit: number) => { 
    await this.supplierService.findProductsBySupplier(cuit).subscribe((data:any) => {
      console.log(data);
      this.products = data.data;
    });
    });
    }
  
  delete(id: string) {
    console.log(id);
    Swal.fire({
      title: 'Desea eliminar el producto',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e7c633',
      cancelButtonColor: '#f76666',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.delete(id)
        .subscribe({
          next: res => {
          Swal.fire(
            'Confirmado',
            'La acción ha sido confirmada',
            'success'
            );
            this.router.navigate(['/AdminProducts']);
            this.products = this.products.filter(product => product.id !== id); // lo tuve que agregar para que se actualice la página y no quede el prodcuto que ya había eliminado hasta que se recargue 
          },
          error: err => {
            console.log(err);
          }
        });
      }
    });
  }
  
  edit(product: any): void {
    product.editName = product.name;
    product.editPrice = product.price;
    product.editStock = product.stock;
    product.editDescription = product.description;
    product.editing = true;
  }

  save(product: any): void {
    if (!product.editName || !product.editPrice || !product.editStock || !product.editDescription ) { 
      Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: 'Debe completar todos los campos.',
      });
    } else {   
      if (product.editName !== product.name || product.price !== product.editPrice || product.stock !== product.editStock || product.description !== product.editDescription) {
        product.editName = product.editName.charAt(0).toUpperCase() + product.editName.slice(1).toLowerCase();
        this.productService.findProductByName(product.editName)
        .subscribe(
          (existingproduct: any) => {
            if (existingproduct === null || product.name === product.editName ) {
            product.name = product.editName;
            product.price = product.editPrice;
            product.stock = product.editStock;
            product.description = product.editDescription;
    
            this.productService.update(product).subscribe(
            (response: any) => {
              console.log(response);
              Swal.fire(
              'Producto registrado con éxito!!',
              '',
              'success'
              );
              product.editing = false;
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
      } else {
        Swal.fire({
          icon: 'info',
          title: 'Sin cambios',
          text: 'No se realizaron cambios en el producto.',
        });
      }
    }
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

  onSupplierButtonClick(cuit: number) {
    this.filterProductsSupplierService.emitSupplierSelected(cuit);  // Emite el evento
    console.log("supplier in component: ", cuit);
  }

  onSupplierChange(event: any){
    const selectedCuit = event.target.value;
    console.log(selectedCuit);
    if (selectedCuit){
      const cuitNumber = parseInt(selectedCuit);
      this.onSupplierButtonClick(cuitNumber);
    }
  }
}
  