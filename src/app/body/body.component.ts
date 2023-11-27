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
  cart: any = {
    items: [],
    total: 0 
  }

constructor(
  private productService: ProductService,
  private route: ActivatedRoute, // Agrega ActivatedRoute al constructor
  private cartService: CartService,
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
  }

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
  );
}

public getCart() {
  const existCart = localStorage.getItem('CART');
  if (!!!existCart) {
    this.cart = { total: 0, items: [] }
    localStorage.setItem('CART', JSON.stringify(this.cart))
    return
  }
}

public addToCart(product: any) {
  this.cartService.addToCart(product);
  window.alert('Your product has been added to the cart!');

  const CURRENT_CART = JSON.parse(localStorage.getItem('CART') as any) // MUST BE TYPED
  const hasThisProduct = CURRENT_CART.items.find((x: any) => x.id === product.id)

  if(!!!hasThisProduct) {
    CURRENT_CART.items.push({
      ...product,
      quantity: 1 
    })

    const NEW_CART = { total: 0, items: CURRENT_CART.items }
    localStorage.setItem('CART', JSON.stringify(NEW_CART))

    return
  }

  const index = CURRENT_CART.items.findIndex((x: any) => x.id === product.id)
  const updatedProduct = {
    ...hasThisProduct,
    quantity: hasThisProduct.quantity++
  }

  const newItems = CURRENT_CART.items.slice( index, 1 )
  CURRENT_CART.items.push( updatedProduct )

  const NEW_CART = { total: 0, items: newItems }
  localStorage.setItem('CART', JSON.stringify(NEW_CART))
}
}

  //public addToCart(event: Event, product: any) {
    //event.preventDefault()
    //event.stopPropagation()
    
    //const CURRENT_CART = JSON.parse(localStorage.getItem('CART') as any) // MUST BE TYPED
    //const hasThisProduct = CURRENT_CART.items.find((x: any) => x.id === product.id)

    //if(!!!hasThisProduct) {
      //CURRENT_CART.items.push({
        //...product,
        //quantity: 1 
      //})

      //const NEW_CART = { total: 0, items: CURRENT_CART.items }
      //localStorage.setItem('CART', JSON.stringify(NEW_CART))

      //return
    //}

    //const index = CURRENT_CART.items.findIndex((x: any) => x.id === product.id)
    //const updatedProduct = {
      //...hasThisProduct,
      //quantity: hasThisProduct.quantity++
    //}

    //const newItems = CURRENT_CART.items.slice( index, 1 )
    //CURRENT_CART.items.push( updatedProduct )

    //const NEW_CART = { total: 0, items: newItems }
    //localStorage.setItem('CART', JSON.stringify(NEW_CART))
  //}
//}
  

