import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  products: any[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute, // Agrega ActivatedRoute al constructor
    private cartService: CartService,
  ) {}

  ngOnInit() {
      this.route.queryParams.subscribe((queryParams) => {
        const searchTerm = queryParams['q'];

        console.log(searchTerm);
        this.productService.findAll().subscribe((data:any) => {
          console.log(data);
          this.products = data.data;  // dentro de data están los productos
        });
      }
    );
  }

  public addToCart(product: any) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }
}
