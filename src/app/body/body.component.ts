/*import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { NavBarEventService } from '../services/nav-bar-event.service';
import { CategoryService } from '../services/category.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent {
  products: any[] = [];
  apiUrl = environment.apiUrl;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute, // Agrega ActivatedRoute al constructor
    private cartService: CartService,
    private navbarEventService: NavBarEventService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
      this.route.queryParams.subscribe((queryParams) => {
        const searchTerm = queryParams['q'];

        console.log(searchTerm);
        this.productService.findAll().subscribe((data:any) => {
          console.log(data);
          this.products = data.data;  // dentro de data están los productos
        });
      });
    this.navbarEventService.categoryButtonClick$.subscribe(async (name: string) => { 
      await this.categoryService.findProductsByCategory(name).subscribe((data:any) => {
        console.log(data);
        this.products = data.data;
      });
    });

  }

  public addToCart(product: any) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }
}*/

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { NavBarEventService } from '../services/nav-bar-event.service';
import { CategoryService } from '../services/category.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss']
})
export class BodyComponent implements OnInit {
  products: any[] = [];
  apiUrl = environment.apiUrl;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService,
    private navBarEventService: NavBarEventService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      const searchTerm = queryParams['q'];

      if (searchTerm) {
        this.productService.searchProducts(searchTerm).subscribe((response: any) => {
          if (response.message === 'found products') {
            this.products = response.data;
          }
        });
      } else {
        this.productService.findAll().subscribe((data: any) => {
          this.products = data.data;
        });
      }
    });

    this.navBarEventService.categoryButtonClick$.subscribe(async (name: string) => {
      await this.categoryService.findProductsByCategory(name).subscribe((data: any) => {
        this.products = data.data;
      });
    });

    this.navBarEventService.searchResults$.subscribe((results: any[]) => {
      this.products = results;
    });
  }

  public addToCart(product: any) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
  }
}
