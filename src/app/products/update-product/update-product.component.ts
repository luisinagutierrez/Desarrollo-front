import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent {
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
}
 