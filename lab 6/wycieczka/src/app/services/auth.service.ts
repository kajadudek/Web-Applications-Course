import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth, PERSISTENCE } from "@angular/fire/compat/auth";
import { first, map, Observable, take } from 'rxjs';
import { UserService } from './user.service';
import { FirebaseService } from './firebase.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import firebase from 'firebase/compat/app';

export class User{
  public constructor(
    public id: string,
    public name: string,
    public email: string,
    public type: string,
    public history: Array<{id: number; name: string; country: string; startDate: string; endDate: string; cost: number; addedToCart: number; dateOfBought: any; boughtID: number; toBe: boolean; ended: boolean; during: boolean; lessThan2Weeks: boolean; rated: number;}>,
  ){}
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData!: Observable<any>;
  currPersistence!: any;

  constructor(public afAuth: AngularFireAuth,
          private router: Router,
          private users: UserService,
          private fb: FirebaseService,
          private db: AngularFireDatabase){
    this.fb.actualPersistence().subscribe(e => {
      this.currPersistence = e;
      this.changePersistence(this.currPersistence);
    })
    this.userData = afAuth.authState;
  }

  signUp(nick: any, email: any, password: any) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.router.navigate(['login']);
        let user = new User(res.user!.uid, nick, email, "user", []);
        this.users.addNewUser(user);
      })
      .catch(error => {
        alert('Try again. ' + error);
      })
  }

  logIn(email: any, password: any){
    this.afAuth.signInWithEmailAndPassword(email, password).then(() =>{
      this.router.navigate(['home']);
    })
    .catch(error => {
      alert('There was a problem. ' + error);
    });
  }

  logOut(){
    this.afAuth.signOut().then(() => {
      this.fb.clearCart();
    }).catch(error => {
        alert('There was a problem. ' + error);
      })
  }

  // Persistence
  changePersistence(persistence: string){
    this.db.object('persistence').set(persistence);
    if(persistence == 'local') {
      this.afAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    } else if (persistence == 'session') {
      this.afAuth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    } else {
      this.afAuth.setPersistence(firebase.auth.Auth.Persistence.NONE);
    }
  }
}
