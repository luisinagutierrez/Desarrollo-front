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
          const newcity = addForm.value;
          console.log(newcity);

      this.cityService.add(newcity)
        .subscribe(
          (res:Response) => {
            console.log(res);
            Swal.fire(
              'Ciudad ingresada con éxito!!',
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
  
  
