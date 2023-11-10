import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.scss']
})
export class DeleteProductComponent {
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
    this.productService.findAll().subscribe((data:any) => {
      console.log(data);
      this.products = data.data;  // dentro de data están los productos
    });
  }
  );
}
delete() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     this.productService.delete(this.Id)
    //     .subscribe(
    //       {
    //         next:res => {
    //           Swal.fire(
    //            'Confirmado',
    //            'La acción ha sido confirmada',
    //            'success'
    //          );
    //          this.router.navigate(['/productos']);
    //         },
    //         error:err => {
    //           console.log(err);
    //         }
    //       }
    //     );       
    //   }
    // });
  });
}}
