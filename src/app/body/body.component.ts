import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { NavBarEventService } from '../services/nav-bar-event.service';
import { CategoryService } from '../services/category.service';

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

<<<<<<< HEAD
  public addToCart(product: any) {
    this.cartService.addToCart(product);
    window.alert('Your product has been added to the cart!');
=======
constructor(
  private productService: ProductService,
  private route: ActivatedRoute, // Agrega ActivatedRoute al constructor
  private cartService: CartService,
  private navbarEventService: NavBarEventService,
  private categoryService: CategoryService
) {
  this.getCart()
}

ngOnInit() {
  // Recupera el valor del parámetro de consulta llamado 'q'
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


    // Llama al servicio para obtener productos filtrados si searchTerm está presente
    // if (searchTerm) {
    //
    //   this.productService.getProductsFiltered(searchTerm).subscribe((data) => {
    //     this.products = data;
    //   });
    // } else {
      // Si no se proporciona un término de búsqueda, obtén todos los productos
    //   this.productService.findAll().subscribe((data) => {
    //     this.products = data;
    //   });
    // }
  //}
  
}

onCategoryButtonClick() {
  this.navbarEventService.categoryButtonClick$.subscribe
  ((name: string) => {
    this.categoryService.findProductsByCategory(name).subscribe((data:any) => {
      console.log(data);
      this.products = data.data;
    });
  });
}

public getCart() {
  const existCart = localStorage.getItem('CART');
  if (!!!existCart) {
    this.cart = { total: 0, items: [] }
    localStorage.setItem('CART', JSON.stringify(this.cart))
    return
>>>>>>> 2d674584676c641e88b72b08af14a2d23732a2ae
  }
}
