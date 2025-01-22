import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from '../../services/user.service';
import { CityService } from '../../services/city.service';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { LoginRequest } from 'src/app/services/loginRequest';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginError: string = '';
  isPasswordIncorrect: boolean = false; // Nueva variable para manejar el error de contraseña incorrecta
  showPassword: boolean = false;

  loginForm = this.formbuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private formbuilder: FormBuilder,
    private loginService: LoginService
  ) {}

  get email() {
    return this.loginForm.controls.email;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  login() {
    if (this.loginForm.valid) {
      this.authService
        .sendRequestToLogin(
          this.email.value as string,
          this.password.value as string
        )
        .subscribe(
          (data) => {
            this.authService.saveToken(data.accessToken);
            console.log("primero data y despues data toker",data, data.accessToken) // ACA GUARDAMOS LA INFORMACION DEL TOLEN 
            this.isPasswordIncorrect = false; // Resetea el error si el login es exitoso
            this.loginError = '';
            this.router.navigate(['/']); // Redirige al usuario si es exitoso
          },
          (error) => {
            this.isPasswordIncorrect = true;
            this.loginError = error?.message || 'Contraseña incorrecta';
          }
        );
    } else {
      this.loginForm.markAllAsTouched();
      alert('Error al ingresar');
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}

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

    
