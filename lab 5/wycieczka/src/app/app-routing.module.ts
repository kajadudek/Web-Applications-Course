import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTripComponent } from './add-trip/add-trip.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TripComponent } from './trip/trip.component';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  { path: 'trips', component: TripComponent},
  { path: 'add-trip', component: AddTripComponent},
  { path: '**', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
