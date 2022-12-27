import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Observable } from 'rxjs';
import { UserService } from './user.service';

export class User{
  public constructor(
    public id: string,
    public name: string,
    public email: string,
    public type: string,
    public history: Array<{id: number, name: string, quantity: number, rated: boolean, rating: number}>,
  ){}
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData!: Observable<any>;

  constructor(public afAuth: AngularFireAuth,
          private router: Router,
          private users: UserService){
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
    this.afAuth.signOut().then(() => {})
      .catch(error => {
        alert('There was a problem. ' + error);
      })
  }
}
