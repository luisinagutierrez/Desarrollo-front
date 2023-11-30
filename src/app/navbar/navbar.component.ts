
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) {}
  
  navigate (){
    this.router.navigate(['login']);
  }
  AdminProducts (){
    this.router.navigate(['AdminProducts']);
  }
  AdminProvinces (){
    this.router.navigate(['AdminProvinces']);
  }
  AdminCategories (){
    this.router.navigate(['AdminCategories']);
  }
  AdminCities (){
    this.router.navigate(['AdminCities']);
  }
  AdminSuppliers (){
    this.router.navigate(['AdminSuppliers']);
  }

}