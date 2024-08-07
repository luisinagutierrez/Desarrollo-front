
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavBarEventService } from '../services/nav-bar-event.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    private router: Router,
    private navbarEventService: NavBarEventService  
    ) {}
  
    UserRegistration (){
    this.router.navigate(['UserRegistration']);
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

  UserList(){
    this.router.navigate(['UserList']);
  }
  UserInformation(){
    this.router.navigate(['UserInformation']);
  }

  onCategoryButtonClick(name: string) {
    this.navbarEventService.emitCategoryButtonClick(name);  // Emite el evento
    console.log("category in component: ", name);
    this.router.navigate([`collection/${ name }`])
  }

}