import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {}
  // login(loginForm: NgForm) {  
  // const newUser = loginForm.value;
  // this.userService.login(newUser)
  //   .subscribe(
  //     (res:Response) => {
  //      console.log(res);
  //     Swal.fire(
  //     'Sesion ingresada con éxito!!',
  //         '',
  //         'success'
  //         );
  //       },
  //       (err: Error) => {
  //       console.log(err);
              
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Registro fallido',
  //         text: err.message,
  //         });
  //       }
  //     );        
  //   }
  //   }
  //   function subscribe(arg0: (res: Response) => void, arg1: (err: Error) => void) {
  //   throw new Error('Function not implemented.');

    
