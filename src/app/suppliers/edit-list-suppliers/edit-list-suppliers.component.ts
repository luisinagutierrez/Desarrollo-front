import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupplierService } from 'src/app/services/supplier.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-list-suppliers',
  templateUrl: './edit-list-suppliers.component.html',
  styleUrls: ['./edit-list-suppliers.component.scss']
})
export class EditListSuppliersComponent {

  suppliers: any[] = [];

  constructor(
    private supplierService: SupplierService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.supplierService.findAll().subscribe((data: any) => {
      console.log(data);
      this.suppliers = data.data;
    });
  }

  delete(id: string) {
    console.log(id);
    Swal.fire({
      title: 'Desea eliminar la provincia',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e7c633',
      cancelButtonColor: '#f76666',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.supplierService.delete(id).subscribe({
          next: res => {
            Swal.fire(
              'Confirmado',
              'La acción ha sido confirmada',
              'success'
            );
            this.router.navigate(['/AdminSuppliers']);
            this.suppliers = this.suppliers.filter(supplier => supplier.id !== id);
          },
          error: err => {
            console.log(err);
          }
        });
      }
    });
  }

  edit(supplier: any): void {
    supplier.editBusinessName = supplier.businessName;
    supplier.editEmail = supplier.email;
    supplier.editPhone = supplier.phone;
    supplier.editing = true;
  }

  save(supplier: any): void {
    console.log(supplier);
    
    supplier.businessName = supplier.editBusinessName;
    supplier.email = supplier.editEmail;
    supplier.phone = supplier.editPhone;

    console.log(supplier);
    this.supplierService.update(supplier).subscribe({
      next: res => {
        Swal.fire(
          'Confirmado',
          'Los cambios han sido guardados',
          'success'
        );
      },
      error: err => {
        console.log(err);
      }
    });
    supplier.editing = false;
  }
}

