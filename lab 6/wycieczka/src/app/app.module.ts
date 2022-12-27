import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment'; 
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireDatabaseModule} from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TripComponent } from './trip/trip.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddTripComponent } from './admin-page/add-trip/add-trip.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RatingComponent } from './rating/rating.component';
import { StarComponent } from './rating/star/star.component';
import { FilterPipe } from './pipes/country.pipe';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ShoppingCartExtendedComponent } from './shopping-cart-extended/shopping-cart-extended.component';
import { DatePipe } from '@angular/common';
import { TripInfoComponent } from './trip-info/trip-info.component';
import { TripStatusPipe } from './pipes/trip-status.pipe';
import { LoginComponent } from './authorization/login/login.component';
import { SignupComponent } from './authorization/signup/signup.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { TripManageComponent } from './trip-manage/trip-manage.component';
import { ModifyTripComponent } from './modify-trip/modify-trip.component';

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
    ShoppingCartExtendedComponent,
    TripInfoComponent,
    TripStatusPipe,
    LoginComponent,
    SignupComponent,
    AdminPageComponent,
    TripManageComponent,
    ModifyTripComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    HttpClientModule,
    AngularFireAuthModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
