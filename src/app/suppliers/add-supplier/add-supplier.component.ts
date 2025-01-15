import { Component } from '@angular/core';
import { SupplierService } from 'src/app/services/supplier.service';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.scss']
})
export class AddSupplierComponent {

  constructor(
    private supplierService: SupplierService,
    private router: Router,
  ) {}

  add(addForm: NgForm) {  
    const newSupplier = addForm.value;
    console.log(newSupplier.cuit);
      this.supplierService.findSupplierByCuit(newSupplier.cuit)
        .subscribe(
          (existingSupplier: any) => {
            console.log('Respuesta de la verificación de CUIT:', existingSupplier);

            if (existingSupplier === null) {
              console.log('Entró al add');
              this.supplierService.add(newSupplier).subscribe(
                (response: any) => {
                  console.log(response);
                  Swal.fire(
                    'Proveedor agregado con éxito!!',
                    '',
                    'success'
                  );
                },
                (err: any) => {
                  console.log(err);
                  Swal.fire({
                    icon: 'error',
                    title: 'Registro fallido',
                    text: 'El cuit del nuevo proveedor que desea ingresar ya existe.',
                  });
                }
              );
            }
          },
          (err: any) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error en la verificación del CUIT.',
            });
          }
        );
    }
  }
