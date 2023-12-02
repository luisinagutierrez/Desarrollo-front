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
  console.log(newUser);
  //no funciona esto de que por defecto te ponga esta imagen
  if( newUser.image === " " ) {newUser.image = "https://assets.stickpng.com/images/585e4beacb11b227491c3399.png";}
  newUser.privilege = "cliente";
  
  this.userService.signUp(newUser)
    .subscribe(
      (res:Response) => {
      console.log(res);
      Swal.fire(
      'Usuario registrado con éxito!!',
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
    



  
  