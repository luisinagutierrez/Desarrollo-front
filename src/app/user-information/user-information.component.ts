import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ProvinceService } from '../services/province.service';
import { CityService } from '../services/city.service';
import { User } from '../services/userInterface.js';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss']
})
export class UserInformationComponent implements OnInit {
  userData: User | null = null;
  userForm!: FormGroup;
  isEditMode = false;
  isAdmin: boolean = false;
  showDeleteModal = false;
  provinces: any[] = [];
  cities: any[] = [];

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private provinceService: ProvinceService,
    private cityService: CityService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadProvinces();
    this.initForm();
    }

  private initForm(): void {
    this.userForm = this.fb.group({
      email: [''],
      firstName: [''],
      lastName: [''],
      phone: [''],
      street: [''],
      streetNumber: [''],
      province: [''],
      city: ['']
    });
  }

  
  loadUserData(): void {
    const user = this.authService.getLoggedUser();
    console.log("Logged user:", user);
    console.log("Mail user: ", user.email);
  
    if (user && user.email) {
      this.userService.findUserByEmail(user.email).subscribe({
        next: (response) => {
          console.log("User data response:", response); // Debugging log
          if (response && response.data) {
            this.userData = response.data;
            console.log('Stored userData: ', this.userData); // Debugging log
          }

          //Store ID from the user
          this.userForm.patchValue({
            ...this.userData,
            id: this.userData ? this.userData._id : ''
          });

          if (this.userData?.city){
            this.loadCityById(this.userData.city);
          }
        },
        error: (err) => {
          console.error('Error loading user data:', err);
          this.handleError('Error loading user data');
        }
      });
    } else {
      console.error('No logged in user found');
    }
  }

loadCityById(cityId: string): void {
  this.cityService.findCityById(cityId).subscribe({
    next: (data) => {
      console.log('City data:', data); // Debugging log
      if (this.userData) {
        // Check the structure of the data object
        if (data && data.name) {
          this.userData.city = data.name;
        } else if (data && data.data && data.data.name) {
          this.userData.city = data.data.name;
        } else {
          console.error('City name not found in the response data');
        }
      }
    },
    error: (err) => {
      console.error('Error loading city:', err); // Debugging log
      this.handleError('Error loading city');
    }
  });
}
  
  loadProvinces(): void {
    this.provinceService.findAll().subscribe({
      next: (response) => {
        console.log('Provinces data:', response); // Debugging log
        this.provinces = Array.isArray(response) ? response : [];
        console.log("estas son las provincias:", this.provinces);
      },
      error: (err) => {
        console.error('Error loading provinces:', err); // Debugging log
        this.handleError('Error loading provinces');
      }
    });
  }

  onProvinceChange(event: any): void {
    const provinceId = event.target.value;
    if (provinceId) {
      this.provinceService.findCitiesByProvince(provinceId).subscribe({
        next: (response) => {
          console.log('Cities data:', response); // Debugging log
          this.cities = Array.isArray(response) ? response : [];
          console.log("estas son las ciudades:", this.cities); // Debugging log
        },
        error: (err) => {
          console.error('Error loading cities:', err); // Debugging log
          this.handleError('Error loading cities');
        }
      });
    } else {
      console.error('No province selected'); // Debugging log
    }
  }

onSubmit(): void {
  if (this.userForm.valid && this.userData) {
    // Debug log form values
    console.log('Form before update:', this.userForm.value);
    
    const updatedUser = {
      id: this.userData.id || this.userData._id,
      email: this.userForm.value.email,
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName, 
      phone: this.userForm.value.phone,
      street: this.userForm.value.street,
      streetNumber: String(this.userForm.value.streetNumber),
      city: this.userForm.value.city,
      province: this.userForm.value.province
    };
    
    // Debug log transformed data
    console.log('Sending to backend:', updatedUser);
    
    this.userService.updateUser(updatedUser).subscribe({
      next: (response) => {
        // Debug log response
        console.log('Backend response:', response);
        Swal.fire('Success', 'Information updated', 'success');
        this.isEditMode = false;
        this.loadUserData();
      },
      error: (err) => {
        console.error('Update error:', err);
        this.handleError('Error updating information');
      }
    });
  }
}

  deleteAccount(): void {
    if (!this.userData?.email) return;

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Está acción es permanente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e7c633',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Confirmar baja'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(this.userData!.email).subscribe({
          next: () => {
            this.authService.logout();
            localStorage.removeItem('accessToken');
            Swal.fire({
              title: 'Dado de baja!',
              text: 'Cuenta eliminada exitosamente',
              icon: 'success'
          }).then(() => {
            this.router.navigate(['/#']);
          });
          },
          error: (err) => this.handleError('Error eliminando la cuenta')
        });
      }
    });
  }

  private handleError(message: string): void {
    console.error(message);
    Swal.fire('Error', message, 'error');
  }

  toggleEditMode(): void {
    this.isEditMode = !this.isEditMode;
  }

  cancelEdit(): void {
    this.isEditMode = false;
    if (this.userData) {
      this.userForm.patchValue(this.userData);
    }
  }

  showDeleteButton(): Boolean{
    return this.userData?.privilege !== 'administrador';
  }

  showDeleteConfirmation(): void {
    this.showDeleteModal = true;
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
  }
 
}