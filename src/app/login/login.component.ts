import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user ={
    email: '',
    password: ''
  }
  constructor(
    private authService: AuthService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }
  
  ngOnInit(){
    const token = localStorage.getItem('token');
  }

  sanitizeInput(input: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(input);
  }

  login(){
    this.authService.logIn(this.user)
      .subscribe(
        {
          next: (res: any)  => {
            console.log(res);
            localStorage.setItem('token', res.token);
            this.router.navigate(['/products']);
          },
          error: (err: any) => {
          console.log(err);
          
          let errorMessage = err.error.message;
          if(err.status === 401){
            errorMessage = 'Credenciales incorrectas. Por favor, verifique su nombre de usuario y contraseña.';
          } else if(err.status === 403){
            errorMessage = 'No tiene permisos para acceder a este recurso.';
          }

          Swal.fire({
            icon: 'error',
            title: 'Inicio de sesión fallido',
            text: errorMessage,
            timer: 1000,
          });
      }
    });
  }



}
  // myForm: FormGroup;

  // constructor(private fb: FormBuilder, private router: Router) {
  //   this.myForm = fb.group({
  //     option: ['', Validators.required]
  //   });
  // }
  //   navigate (){
  //   this.router.navigate(['reset-password'])};

  // submitForm() {
  //   this.router.navigate(['/products']);
  // }



//   email: string = '';
//   password: string = '';

//   constructor(private authService: AuthService) {}

//   logIn(): void {
//     this.authService.logIn(this.email, this.password)
//       .subscribe(response => {
//         // Manejar la respuesta y guardar el token (por ejemplo, en localStorage)
//         localStorage.setItem('token', response.token);
//         // Redirigir al usuario a la página principal o a donde sea necesario
//       }, error => {
//         // Manejar el error de autenticación (por ejemplo, mostrar un mensaje de error)
//       });
//   }
// }