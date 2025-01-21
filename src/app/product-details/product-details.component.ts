import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})

export class ProductDetailsComponent implements OnInit {
  product: any | undefined;
  products: any | undefined;
  apiUrl = environment.apiUrl;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,

  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      const searchTerm = queryParams['q'];

      this.productService.findAll().subscribe((data:any) => {
        this.products = data.data;  // dentro de data están los productos

        this.buildData()
      });
    })
  }

  public buildData() {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = routeParams.get('productId');

    // Find the product that correspond with the id provided in route.
    this.product = this.products.find((product: any) => product.id === productIdFromRoute);
  }

  public addToCart(product: any) {
    // Verificamos el stock con el backend antes de agregarlo al carrito
    const quantityToAdd = 1; // Solo queremos agregar uno
    this.productService.verifyStock(product.id, quantityToAdd).subscribe({
      next: () => {
        this.cartService.addToCart(product);
     },
     error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Lo sentimos',
        text: `No hay stock suficiente para el producto ${product.name}`,
      });
    }
  });
  }
  
  
}
