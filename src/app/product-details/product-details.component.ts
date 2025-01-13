import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { environment } from '../../environments/environment';

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
    private cartService: CartService
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
    this.cartService.addToCart(product);
    this.productService.updateStock(product.id,1,"compra").subscribe({
    next: (response) => {
      console.log("Stock actualizado (compra):", response);
      window.alert('El producto fue añadido correctamente al carrito');
    },
    error: (err) => {
      console.error("Error al actualizar el stock (compra):", err);
      window.alert('Hubo un problema al agregar el producto al carrito. Por favor, intenta nuevamente.');
      this.cartService.removeFromCart(product);
    }
  });
  }
}
