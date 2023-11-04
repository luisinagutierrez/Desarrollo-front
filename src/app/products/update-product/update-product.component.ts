import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; // Importa NgbActiveModal
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent {
  
  @Input() updateProduct: any;


  constructor(public activeModal: NgbActiveModal, private productService: ProductService,) {}


  saveChanges() {
    this.productService.updateProduct(this.updateProduct, this.updateProduct._id)
    .subscribe(
      res => {
        console.log(res);
        Swal.fire(
          'Producto actualizado con éxito!!',
          '',
          'success'
        );
      },
      (err) => {
        console.log(err);
        // Muestra la alerta de error con el mensaje personalizado
        Swal  .fire({
          icon: 'error',
          title: 'Actualizacion fallida',
          text: err.error,
        });
      }
      );
    this.activeModal.close(this.updateProduct);
  }

  close() {
    this.activeModal.close(this.updateProduct);
  }


}
