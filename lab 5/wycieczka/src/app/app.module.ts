import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripComponent } from './trip/trip.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddTripComponent } from './add-trip/add-trip.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingComponent } from './rating/rating.component';
import { StarComponent } from './rating/star/star.component';
import { FilterPipe } from './pipes/country.pipe';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ShoppingCartExtendedComponent } from './shopping-cart-extended/shopping-cart-extended.component';
import { DatePipe } from '@angular/common';
// import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent,
    TripComponent,
    AddTripComponent,
    RatingComponent,
    StarComponent,
    FilterPipe,
    ShoppingCartComponent,
    SidebarComponent,
    HomePageComponent,
    ShoppingCartExtendedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule
    // AgmCoreModule.forRoot( {
    //   apiKey: ''
    // })
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
