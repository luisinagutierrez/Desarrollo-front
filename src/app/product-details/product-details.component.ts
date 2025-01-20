import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { environment } from '../../environments/environment';
import Swal from 'sweetalert2';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})

export class ProductDetailsComponent implements OnInit {
  product: any | undefined;
  products: any | undefined;
  apiUrl = environment.apiUrl;
  cities: any[] = [];
  selectedCityId: string | null = null; // Para el ID seleccionado
  selectedCity: any | undefined; 

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private cityService: CityService
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      const searchTerm = queryParams['q'];

      this.productService.findAll().subscribe((data:any) => {
        this.products = data.data;  // dentro de data están los productos

        this.buildData()
      });
    })
    this.getCities();
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
  getCities() {
    this.cityService.findAll()
    .subscribe(
      (data: any) => {
        console.log('Cities received', data);
        this.cities = data.data;
      },
      (error) => {
        console.error('Error fetching cities', error);
      }
    );
  }
  
  onCityChange(event: any) {
    const cityId = event.target.value;
    this.selectedCity = this.cities.find((city) => city.id === cityId);
    if (this.selectedCity) {  // SI QUIEREN BORRENLO, LO HICE SOLO PARA IR TESTEANDO QUE FUNCIONA BIEN 
      console.log('Ciudad seleccionada:', this.selectedCity);
    } else {
      console.error('No se encontró la ciudad seleccionada');
    }
  }
  
}
