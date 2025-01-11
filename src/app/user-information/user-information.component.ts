import { Component } from '@angular/core';
import { LoginService } from '../services/login.service';
import { User } from '../services/user';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.scss']
})
export class UserInformationComponent {
  userLoginOn:boolean=false;
  userData?:User;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    })

    this.loginService.currentUserData.subscribe({
      next: (userData) => {
        this.userData=userData;
      }
    })
  }
  }
