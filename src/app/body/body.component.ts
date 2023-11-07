import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
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
) {}
ngOnInit() {
  // Recupera el valor del parámetro de consulta llamado 'q'
  this.route.queryParams.subscribe((queryParams) => {
    const searchTerm = queryParams['q'];

    console.log(searchTerm);

    // Llama al servicio para obtener productos filtrados si searchTerm está presente
    // if (searchTerm) {
    //
    //   this.productService.getProductsFiltered(searchTerm).subscribe((data) => {
    //     this.products = data;
    //   });
    // } else {
      // Si no se proporciona un término de búsqueda, obtén todos los productos
      this.productService.findAll().subscribe((data) => {
        this.products = data;
      });
    }
  //}
  );
}

}
