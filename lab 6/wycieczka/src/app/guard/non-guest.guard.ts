import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, of, switchMap, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NonGuestGuard implements CanActivate {
  constructor(private auth: AuthService,
    private router: Router,
    private db: AngularFireDatabase){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.auth.userData.pipe(
      take(1),
      switchMap(user => {
        if (user != null) {
          return this.db.object('users/' + user.uid).valueChanges().pipe(take(1))
        }
        else{ return of(null); }
      }), map((usr: any) => {
        if (usr == null) {
          this.router.navigate(['/home']);
          return false;
        }
        if (usr.type != 'guest') { return true; }
        else {
          this.router.navigate(['/home']);
          return false;
        };
      })
    )}
}
