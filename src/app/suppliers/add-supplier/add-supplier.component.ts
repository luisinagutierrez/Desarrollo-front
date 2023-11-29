import { Component, OnInit } from '@angular/core';
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
      console.log(newSupplier);

    this.supplierService.add(newSupplier)
      .subscribe(
        (res:Response) => {
          console.log(res);
          Swal.fire(
            'Proveedor agregado con éxito!!',
            '',
            'success'
          );
        },
        (err: Error) => {
          console.log(err);
          
          Swal.fire({
            icon: 'error',
            title: 'Registro fallido',
            text: err.message,
          });
        }
      );
      
  }
}
function subscribe(arg0: (res: Response) => void, arg1: (err: Error) => void) {
  throw new Error('Function not implemented.');
}

