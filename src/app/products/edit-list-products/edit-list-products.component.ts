import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SupplierService } from 'src/app/services/supplier.service';
import { FilterProductsSupplierService } from 'src/app/services/filter-products-supplier.service';

@Component({
  selector: 'app-edit-list-products',
  templateUrl: './edit-list-products.component.html',
  styleUrls: ['./edit-list-products.component.scss']
})
export class EditListProductsComponent {
  products: any[] = [];
  suppliers: any[] = [];
  
    constructor(
      private productService: ProductService,
      private route: ActivatedRoute,
      private router: Router,
      private supplierService: SupplierService,
      private filterProductsSupplierService: FilterProductsSupplierService,
    ) {}
  
    ngOnInit() {
      this.getSuppliers();
      this.productService.findAll().subscribe((data: any) => {
      console.log(data);
      this.products = data.data;
      this.products.forEach(product => {/// esto hace que cuando apretemos el editar se muestre lo que estaba antes puesto, si no quieren que se va y que aparezca todo el blanco
        product.editing = false;
        product.editPrice = product.price;
        product.editStock = product.stock;
        product.editDescription = product.description;
          });
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
      product.editing = true;
    }
  
    save(product: any): void {
      console.log(product);
      product.price = product.editPrice;
      product.stock = product.editStock;
      product.description = product.editDescription;

      console.log(product);
      this.productService.update(product).subscribe({
        next: res => {
          Swal.fire(
            'Confirmado',
            'Los cambios han sido guardados',
            'success'
          );
        },
        error: err => {
          console.log(err);
        }
      });
      product.editing = false;
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
  