import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'; 
import { ProvinceService } from 'src/app/services/province.service';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-province',
  templateUrl: './add-province.component.html',
  styleUrls: ['./add-province.component.scss']
})
export class AddProvinceComponent {
  constructor(
    private provinceService: ProvinceService,
    private router: Router,
  ) {}
  
    add(addForm: NgForm) {  
      const newProvince = addForm.value;
      console.log(newProvince);

    this.provinceService.add(newProvince)
      .subscribe(
        (res:Response) => {
          console.log(res);
          Swal.fire(
            'Provincia agregada con éxito!!',
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

