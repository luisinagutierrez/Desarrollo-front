import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.myForm = fb.group({
      opcion: ['', Validators.required]
    });
  }

  submitForm() {
    const opcion = this.myForm.value.opcion;
    this.router.navigate(['/products']);

    if (opcion === '1') {
      this.router.navigate(['/manager']); // Redirigir a Admin
    } else if (opcion === '2') {
    this.router.navigate(['/products']); // Redirigir a Carousel
    }
  }
}



// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
//   title = 'tp-desarrollo';
// }
