import { Component, OnInit } from '@angular/core';
import { CityService } from 'src/app/services/city.service';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { ProvinceService } from 'src/app/services/province.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.scss']
})
export class AddCityComponent {
  provinces: any[] = [];
  constructor(
    private router: Router,
    private cityService: CityService,
    private provinceservice: ProvinceService
  ) {}
  
  ngOnInit(): void {
    this.getProvinces();
  }

  getProvinces(){
    this.provinceservice.findAll().subscribe((data:any)=>{
      console.log('Date received', data);
      this.provinces = data.data;
      console.log(this.provinces);
      }, (error)=>{
        console.error('Error fetching provinces', error);
      });
  }

  add(addForm: NgForm) {  
    const newCity = addForm.value;
    console.log ('provincia',newCity.province);
    if (!newCity.name || !newCity.postCode || !newCity.province) 
    { 
      Swal.fire({
        icon: 'error',
        title: 'Error en el registro',
        text: 'Debe de completar todos los campos.',
      });
    } else {   
      console.log(newCity.postCode);
      this.cityService.findCityByPostCode(newCity.postCode)
      .subscribe(
        (existingCity: any) => {
          if (existingCity === null) {
          console.log(existingCity);
          newCity.name = newCity.name.charAt(0).toUpperCase() + newCity.name.slice(1).toLowerCase();
          this.cityService.add(newCity).subscribe(
          (response: any) => {
            console.log(response);
            Swal.fire(
            'Ciudad registrada con éxito!!',
            '',
            'success'
            );
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
            text: 'El código postal ya está registrado',
          });
        }      
      },
      (err: any) => {
        console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Error en la verificación del código postal.',
          });
        }
      );
    }
  }
}
  
  


  
  