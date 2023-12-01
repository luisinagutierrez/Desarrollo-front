import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  users: any[] = [];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute, 
  ) {}

  ngOnInit() {
      this.route.queryParams.subscribe((queryParams) => {
        const searchTerm = queryParams['q'];

        console.log(searchTerm);
        this.userService.findAll().subscribe((data:any) => {
          console.log(data);
          this.users = data.data;  
        });
      }
    );
  }



}
