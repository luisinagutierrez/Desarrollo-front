
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent {
  cities: any[] = [];
  constructor(
  private router: Router,
  private userService: UserService,
  private cityService: CityService
  ) {}
  
ngOnInit(): void {
  this.getCities(); 
  }
  
getCities() {
  this.cityService.findAll().subscribe(
    (data: any) => {
    console.log('Date received', data);
    this.cities = data.data;
    console.log(this.cities);
    },
    (error) => {
      console.error('Error fetching cities', error);
    }
  );
}
signUp(signUpForm: NgForm) {  
  const newUser = signUpForm.value;
  //https://assets.stickpng.com/images/585e4beacb11b227491c3399.png
if ( !newUser.email || !newUser.password || !newUser.firstName || !newUser.lastName || !newUser.phone || !newUser.city ){
  Swal.fire({
    icon: 'error',
    title: 'Error al registrarse',
    text: 'Debe completar todos los campos obligatorios (*).',});
  } else {
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
        text: 'Error en la verificación del CUIT.',
      });
    }
    );
  }
  }
}

