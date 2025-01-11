import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CityService } from '../../services/city.service';
import { ProvinceService } from 'src/app/services/province.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent {
  cities: any[] = [];
  provinces: any[] = [];
  selectedProvince: any;
  
  constructor(
  private router: Router,
  private userService: UserService,
  private cityService: CityService,
  private provinceService :ProvinceService,
  ) {}
  
ngOnInit(): void {
  this.getCities();
  this.getProvinces();
}

getProvinces() {
  this.provinceService.findAll()
  .subscribe(
    (data: any) => {
      console.log('Provinces received', data);
      this.provinces = data.data;
    },
    (error) => {
      console.error('Error fetching provinces', error);
    }
  );
}

getCities() {
  console.log('provincia seleccionada:', this.selectedProvince);
  if (this.selectedProvince) {
    this.provinceService.findCitiesByProvince(this.selectedProvince)
      .subscribe(
        (data: any) => {
          console.log('Cities received', data);
          this.cities = data.data;
        },
        (err: any) => {
          console.error('Error fetching cities', err);
        }
      );
  } else {
    this.cities = [];
  }
}
showPasswordInfo() {
  Swal.fire({
    title: 'Requisitos de la contraseña',
    text: 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, un número y un carácter especial.',
    icon: 'info',
    showConfirmButton: false,
    timer: 5000
  });
}
validatePassword(password: string): boolean {
  const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*._-])[A-Za-z\d!@#$%^&*._-]{8,}$/;
  return regex.test(password);
}
signUp(signUpForm: NgForm) {  
  const newUser = signUpForm.value;
  //https://assets.stickpng.com/images/585e4beacb11b227491c3399.png
if ( !newUser.email || !newUser.password || !newUser.firstName || !newUser.lastName || !newUser.phone || !newUser.city ){
  Swal.fire({
    icon: 'error',
    title: 'Error al registrarse',
    text: 'Debe completar todos los campos obligatorios (*).',});}
else if (!this.validatePassword(newUser.password)) {
    Swal.fire({
      icon: 'error',
      title: 'Contraseña inválida',
      text: 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, un número y un carácter especial.',
    });
  } else {
    newUser.email = newUser.email.toLowerCase();
    console.log('mail que entra', newUser.email);
    this.userService.findUserByEmail(newUser.email)
    .subscribe(
      (existingUser: any) => {
      console.log('Respuesta de la verificación del email', existingUser);
      if (existingUser === null) {
        console.log('Entró al add');
        if( !newUser.image) {newUser.image = "https://cdn-icons-png.flaticon.com/512/8279/8279635.png";}
        newUser.privilege = "cliente";
        this.userService.signUp(newUser).subscribe(
        (response: any) => {
        console.log(response);
        Swal.fire(
          'Usuario registrado con éxito!!',
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
            text: 'El email ya está registrado',
          });
        }
      },
      (err: any) => {
      console.log(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error en la verificación del mail.',
      });
    }
    );
  }
  }


}

