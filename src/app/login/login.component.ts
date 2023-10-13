import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.myForm = fb.group({
      option: ['', Validators.required]
    });
  }
    navigate (){
    this.router.navigate(['reset-password'])};

  submitForm() {
    const option = this.myForm.value.option;
    this.router.navigate(['/products']);

    if (option === '1') {
      this.router.navigate(['/manager']); // Redirigir a Admin
  }
}
}

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