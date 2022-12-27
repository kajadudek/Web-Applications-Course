import { Component, OnInit } from '@angular/core';
import { User } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  users: User[] = [];

  constructor(public userService: UserService) {
    this.userService.users.subscribe(data => {
      this.users = data;
    })
   }

  ngOnInit(): void {
  }

}
