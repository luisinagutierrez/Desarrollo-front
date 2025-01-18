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
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    this.loadUserData();
    this.loadProvinces();
  }

  private initForm(): void {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phone: ['', Validators.required],
      street: ['', Validators.required],
      streetNumber: ['', Validators.required],
      province: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  
  loadUserData(): void {
    const user = this.authService.getLoggedUser();
    console.log("estoy en loadUserData, y este es el user:", user);
    console.log("estoy en el loaduserdata y este es el mail que le mando", user.email);
  
    if (user && user.email) {
      this.userService.findUserByEmail(user.email).subscribe({
        next: (data) => {
          console.log("Esta es la data del user:", data); // Debugging log
          this.userData = data.data;
          this.userForm.patchValue(data.data);
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
      next: (data) => {
        console.log('Provinces data:', data); // Debugging log
        this.provinces = Array.isArray(data) ? data : [];
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
      this.cityService.findCitiesByProvince(provinceId).subscribe({
        next: (data) => {
          console.log('Cities data:', data); // Debugging log
          this.cities = Array.isArray(data) ? data : [];
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
    if (this.userForm.valid) {
      this.userService.updateUser(this.userForm.value).subscribe({
        next: () => {
          Swal.fire('Success', 'Information updated', 'success');
          this.isEditMode = false;
          this.loadUserData();
        },
        error: (err) => this.handleError('Error updating information')
      });
    }
  }

  deleteAccount(): void {
    if (!this.userData?.email) return;

    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e7c633',
      cancelButtonColor: '#dc3545',
      confirmButtonText: 'Yes, delete it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(this.userData!.email).subscribe({
          next: () => {
            this.authService.logout();
            Swal.fire('Deleted!', 'Account deleted successfully', 'success');
          },
          error: (err) => this.handleError('Error deleting account')
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

  showDeleteConfirmation(): void {
    this.showDeleteModal = true;
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
  }
 
}