import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProvinceService } from 'src/app/services/province.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-list-provinces',
  templateUrl: './edit-list-provinces.component.html',
  styleUrls: ['./edit-list-provinces.component.scss']
})
export class EditListProvincesComponent {
  provinces: any[] = [];

  constructor(
    private provinceService: ProvinceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.provinceService.findAll().subscribe((data: any) => {
      console.log(data);
      this.provinces = data.data;
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
        this.provinceService.delete(id).subscribe({
          next: res => {
            Swal.fire(
              'Confirmado',
              'La acción ha sido confirmada',
              'success'
            );
            this.router.navigate(['/AdminProvinces']);
            this.provinces = this.provinces.filter(province => province.id !== id);
          },
          error: err => {
            console.log(err);
          }
        });
      }
    });
  }

  edit(province: any): void {
    province.editName = province.name;
    province.editing = true;
  }

  save(province: any): void {
    console.log(province);
    province.name = province.editName;
    console.log(province);
    this.provinceService.update(province).subscribe({
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
    province.editing = false;
  }
}
