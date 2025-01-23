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
    this.provinces = data.data;  });
  }
  
  delete(id: string) {
    console.log('id que entra', id);
    this.provinceService.findCitiesByProvince(id)
      .subscribe(
        (foundCities: any) => {
          console.log('que devuelve el find cities', foundCities);
          if (foundCities.data && foundCities.data.length === 0) { 
            // el foundCities.data lo tuve que agregar, pq si no no funcionaba, pero básicamente lo que hace es como verificar que exita 
            // "algo" en ese array (o sea valida que no sea nullo) y despues el otro si se me courrió más rápido como una manera de validar que si 
            // bien es un array, si la longitud es 0 significa que solo la provincia fue creada sin ninguna ciudad cargada con la misma
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
                    this.provinces = this.provinces.filter(province => province.id !== id);
                  },
                  error: err => {
                    console.log(err);
                  }
                });
              }
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se puede eliminar la provincia, ya que tiene ciudades registradas ',
            });
          }
        },
        error => {
          console.log(error);
        }
      );
  }
  
  edit(province: any): void {
    province.editName = province.name;
    province.editing = true;
  }

  
save(province: any): void {
  if (!province.editName) { 
    Swal.fire({
      icon: 'error',
      title: 'Error en el registro',
      text: 'Debe completar el campo.',
    });
  } else {   
    if (province.editName !== province.name) {
      province.name= province.editName.charAt(0).toUpperCase() + province.editName.slice(1).toLowerCase();
      this.provinceService.findProvinceByName(province.name)
      .subscribe(
        (existingProvince: any) => {
          if (existingProvince === null) {
          this.provinceService.update(province).subscribe(
          (response: any) => {
            console.log(response);
            Swal.fire(
            'Provincia registrada con éxito!!',
            '',
            'success'
            );
            province.editing = false;
          },
          (err: any) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Registro fallido',
              text: err.message,
              });
            }
          );
     
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El nombre ya está registrado',
              });
            }      
          },
          (err: any) => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Error en la verificación del nombre.',
            });
          }
        );
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Sin cambios',
        text: 'No se realizaron cambios en la provinica.',
      });
      province.editing = false;
    }
  }
}
}
  
  
  
   
