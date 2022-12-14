import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTripComponent } from './add-trip/add-trip.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ShoppingCartExtendedComponent } from './shopping-cart-extended/shopping-cart-extended.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { TripInfoComponent } from './trip-info/trip-info.component';
import { TripComponent } from './trip/trip.component';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'trips', component: TripComponent},
  { path: 'add-trip', component: AddTripComponent},
  { path: 'shopping-cart', component: ShoppingCartExtendedComponent},
  { path: 'trips/:id', component: TripInfoComponent},
  { path: '**', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
  {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
