import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
  

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  constructor(
      private router: Router,
      private userService: UserService,
    ) {}
  
  // signUp(signUpForm: NgForm) {  
  // const newUser = signUpForm.value;
  // this.userService.signUp(newUser)
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
    }
    
