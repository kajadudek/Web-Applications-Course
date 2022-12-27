import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTripComponent } from './admin-page/add-trip/add-trip.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { LoginComponent } from './authorization/login/login.component';
import { SignupComponent } from './authorization/signup/signup.component';
import { AuthGuard } from './guard/auth.guard';
import { GuestGuard } from './guard/guest.guard';
import { ManagerGuard } from './guard/manager.guard';
import { UserGuard } from './guard/user.guard';
import { HomePageComponent } from './home-page/home-page.component';
import { ShoppingCartExtendedComponent } from './shopping-cart-extended/shopping-cart-extended.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { TripInfoComponent } from './trip-info/trip-info.component';
import { TripManageComponent } from './trip-manage/trip-manage.component';
import { TripComponent } from './trip/trip.component';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'trips', component: TripComponent},
  { path: 'admin', component: AdminPageComponent, canActivate: [AuthGuard]},
  { path: 'trip-manage', component: TripManageComponent, canActivate: [ManagerGuard]},
  { path: 'shopping-cart', component: ShoppingCartExtendedComponent, canActivate: [UserGuard]},
  { path: 'trips/:id', component: TripInfoComponent, canActivate: [UserGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent, canActivate: [GuestGuard]},
  { path: '**', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
  {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
