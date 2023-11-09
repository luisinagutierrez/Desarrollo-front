import { Component } from '@angular/core';
import {SupplierService} from '../services/supplier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-proveedor',
  templateUrl: './alta-proveedor.component.html',
  styleUrls: ['./alta-proveedor.component.scss']
})
export class AltaProveedorComponent {
  supplier = {
    cuit: '',
    businessName: '',
    email: '',
    phone: '',
  }

  constructor(private supplierService: SupplierService) { }

  async add() {
    this.supplierService.getSupplierCuit(this.supplier.cuit).subscribe((res: any) => {  
      console.log('Response cuit verification: ', res);
      if(res && res.cuitExists){
        Swal.fire({
          title: 'Error al agregar proveedor!',
          text: 'El CUIT ingresado ya existe',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      } else{
        if(
          !this.supplier.cuit ||
          !this.supplier.businessName ||
          !this.supplier.email ||
          !this.supplier.phone
        ){
          Swal.fire({
            icon: 'error',
            title: 'Error al agregar proveedor!',
            text: 'Debe completar todos los campos',
          });
        } else{
          const supplier = {
            cuit: this.supplier.cuit,
            businessName: this.supplier.businessName,
            email: this.supplier.email,
            phone: this.supplier.phone,
          };

          this.supplierService.add(supplier).subscribe((res: any) => {
            console.log(res);
            Swal.fire({
              title: 'Proveedor agregado con éxito!',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
            this.resetForm();
          }, (err:any) => {
            console.log(err);
            Swal.fire({
              title: 'Error al agregar proveedor!',
              text: 'Intente nuevamente',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          });;
            }
          }
        }, (err: any) => {
          console.log(err);
          Swal.fire({
            title: 'Error al verificar CUIT!',
            text: 'Ocurrio un error al verificar el CUIT.',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      );}
      resetForm(){
        this.supplier.cuit = '';
        this.supplier.businessName = '';
        this.supplier.email = '';
        this.supplier.phone = ''; 
      }
}
