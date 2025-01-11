import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})

export class ResetPasswordComponent {

  constructor(
    private router: Router,
    private authService: AuthService,
    private formbuilder: FormBuilder,
    private loginService: LoginService)
    {}
  
    VerifyEmail(VerifyEmail: NgForm) {
      const user = VerifyEmail.value;
      console.log('mail que entra', user.email);
      if (!user.email) {
         Swal.fire({
           icon: 'error',
           title: 'Error en la verificación',
           text: 'Por favor ingrese su mail.',
         });
       } else {
        user.email = user.email.toLowerCase();
        console.log('mail que entra', user.email);
        this.authService.findUserByEmail(user.email)
          .subscribe(
            (existingUser: any) => {
              console.log('Respuesta de la verificación del email', existingUser);
              if (existingUser != null) {
                console.log('manda mail');
                this.authService.sendResetPasswordEmail(user.email).subscribe(
                  () => {
                    Swal.fire({
                      icon: 'success',
                      title: 'Correo enviado',
                      text: 'Por favor revise su correo para restablecer su contraseña.',
                    });
                  },
                  (error: any) => {
                    console.error('Error al enviar el correo', error);
                    Swal.fire({
                      icon: 'error',
                      title: 'Error al enviar el correo',
                      text: 'No se pudo enviar el correo. Intente nuevamente.',
                    });
                  }
                );
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'Error en la verificación',
                  text: 'Su mail no fue encontrado.',
                });
              }
            },
            (error: any) => {
              console.error('Error al verificar el email', error);
              Swal.fire({
                icon: 'error',
                title: 'Error en la verificación',
                text: 'No se pudo encontrar su mail. Intente nuevamente.',
              });
            }
          );
      }
    }
 }
