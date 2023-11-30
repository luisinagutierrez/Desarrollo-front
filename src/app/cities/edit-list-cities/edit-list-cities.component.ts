import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityService } from 'src/app/services/city.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-edit-list-cities',
  templateUrl: './edit-list-cities.component.html',
  styleUrls: ['./edit-list-cities.component.scss']
})
export class EditListCitiesComponent {  
  
  cities: any[] = [];

  constructor(
    private cityService: CityService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.cityService.findAll().subscribe((data: any) => {
      console.log(data);
      this.cities = data.data;
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
        this.cityService.delete(id).subscribe({
          next: res => {
            Swal.fire(
              'Confirmado',
              'La acción ha sido confirmada',
              'success'
            );
            this.router.navigate(['/AdminCities']);
            this.cities = this.cities.filter(city => city.id !== id);
          },
          error: err => {
            console.log(err);
          }
        });
      }
    });
  }

  edit(city: any): void {
    city.editName = city.name;
    city.editPostCode = city.postCode;
    city.editing = true;
  }

  save(city: any): void {
    console.log(city);
    city.name = city.editName;
    city.postCode = city.editPostCode;
    console.log(city);
    this.cityService.update(city).subscribe({
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
    city.editing = false;
  }
}

