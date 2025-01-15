import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent implements OnInit {
  userEmail: string = ''; 

  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const storedEmail = localStorage.getItem('userEmail');
    this.userEmail = storedEmail !== null ? storedEmail : ''; // si o si tuve que poner en el caso de que sea nulo pq si no tira error
    localStorage.removeItem('userEmail'); 
    console.log('Correo electrónico obtenido:', this.userEmail);
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
  ResetPassword(ResetPassword: NgForm) {
    const pass = ResetPassword.value;
    if(pass.password != pass.password2){
      Swal.fire({
        icon: 'error',
        title: 'Error en la verificación',
        text: 'Por favor ingrese la misma contraseña dos veces.',
      });
    } else if (!this.validatePassword(pass.password)) {
      Swal.fire({
        icon: 'error',
        title: 'Contraseña inválida',
        text: 'La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, un número y un carácter especial.',
      });
    } else {
      this.userService.updatePassword(this.userEmail, pass.password)
      .subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Contraseña actualizada',
            text: 'Su contraseña ha sido actualizada correctamente.',
          }).then(() => {
            // Redirigir a una página de confirmación o a donde sea necesario
            this.router.navigate(['/']); // Por ejemplo, redirigir a la página principal
          });
        },
        (error: any) => {
          console.error('Error al actualizar contraseña:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar contraseña',
            text: 'No se pudo actualizar la contraseña. Intente nuevamente.',
          });
        }
      );
    }
  }
}  

