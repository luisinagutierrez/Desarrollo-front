import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavBarEventService } from '../services/nav-bar-event.service';
import { LoginService } from '../services/login.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private navbarEventService: NavBarEventService,
    private loginService: LoginService  
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

  ngOnInit(): void {
    this.authService.isLoggedIn$().subscribe((status) => {
      this.isLoggedIn = status;
    });
    this.authService.isAdmin$().subscribe((status) => {
      this.isAdmin = status;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}