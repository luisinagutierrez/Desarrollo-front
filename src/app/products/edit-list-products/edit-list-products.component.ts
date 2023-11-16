import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-list-products',
  templateUrl: './edit-list-products.component.html',
  styleUrls: ['./edit-list-products.component.scss']
})
export class EditListProductsComponent {
  products: any[] = [];
    
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      const searchTerm = queryParams['q'];

      console.log(searchTerm);
      this.productService.findAll().subscribe((data: any) => {
        console.log(data);
        this.products = data.data;  // aca están los productos, entonces lo iteramos para guardarlo en la variables y mandarlo al service para guardarlo
        this.products.forEach(product => {
          product.editing = false;
          product.editPrice = product.price;
          product.editStock = product.stock;
          product.editDescription = product.description
        });
      });
    });
  }

  edit(product: any): void {
    product.editing = true;
  }

  save(product: any): void {
    console.log(product);
    this.productService.update(product)
    .subscribe({
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


// funciona
  delete(id: string) {
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
        this.productService.delete(id).subscribe({
          next: res => {
            Swal.fire(
              'Confirmado',
              'La acción ha sido confirmada',
              'success'
            );
            this.router.navigate(['/productos']);
          },
          error: err => {
            console.log(err);
          }
        });
      }
    });
  }

}
 
