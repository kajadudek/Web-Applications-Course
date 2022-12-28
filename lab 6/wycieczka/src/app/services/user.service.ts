import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { faTachographDigital } from '@fortawesome/free-solid-svg-icons';
import { map, Observable } from 'rxjs';
import { Action } from 'rxjs/internal/scheduler/Action';
import { User } from './auth.service';
import { Trip } from './servicedata.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users!: Observable<any>;

  constructor(private db: AngularFireDatabase) { 
    this.users = this.db.list('users').snapshotChanges().pipe(map(actions => {
      return actions.map((data: any) => {
        let userInfo = data.payload.val();

        if (!userInfo.history){
          userInfo.history = [];
        }

        let newUser = new User(data.payload.key, userInfo.name, userInfo.email, userInfo.type, userInfo.history);
        return newUser;
      })
    }))
  }

  addNewUser(user: User){
    this.db.list('users').set(user.id, 
      {
        name: user.name,
        email: user.email,
        type: user.type,
        history: user.history
      });
  }

  updateUser(user: User){
    this.db.list('users').update(user.id, {type: 'user'});
  }

  updateManager(user: User){
    this.db.list('users').update(user.id, {type: 'manager'});
  }

  updateAdmin(user: User){
    this.db.list('users').update(user.id, {type: 'admin'});
  }

  banUser(user: User){
    this.db.list('users').update(user.id, {type: 'banned'});
  }
}
