import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService, User } from '../services/auth.service';
import { FirebaseService } from '../services/firebase.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  users: User[] = [];
  actualPersistence: any;

  constructor(public userService: UserService,
    private auth: AuthService,
    private fb: FirebaseService) {
    this.userService.users.subscribe(data => {
      this.users = data;
    })

    this.fb.actualPersistence().subscribe(e => {
      this.actualPersistence = e;
    })
   }

  ngOnInit(): void {

  }

  changePersistence(persistence: string){
    this.auth.changePersistence(persistence);
  }

}
