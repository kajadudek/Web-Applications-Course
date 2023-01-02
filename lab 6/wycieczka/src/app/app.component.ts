import { Component, OnInit } from '@angular/core';
import { ServicedataService, Trip } from './services/servicedata.service';
import {faShoppingCart, faPerson, faHome, faPlus, faPlane, faBell, faHamburger} from '@fortawesome/free-solid-svg-icons'
import { DataService } from './services/data.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FirebaseService } from './services/firebase.service';
import { AuthService, User } from './services/auth.service';
import { UserService } from './services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  data!: any;
  trips: Trip[] = [];
  faShoppingCart = faShoppingCart;
  faPerson = faPerson;
  faHome = faHome;
  faPlus = faPlus;
  faPlane = faPlane;
  faBell = faBell;
  title = 'wycieczka';
  totalCost = 0;
  currentCurrency = "PLN";
  tripToRmv!: Trip;
  notification!: boolean;
  currencyConvert = 1;
  howManyTrips = 0;
  deletedTrips = 0;
  displayCartFlag = false;
  mobileMenuOpened = false;
  user = new User('guest', 'guest', 'guest', 'guest', [], []);

  constructor(private dataService: DataService,
    private db: FirebaseService,
    private auth: AuthService,
    private userService: UserService) {}

  updateCurrency(data: string){
    this.dataService.updateCurrency(data);
  }

  updateCurrencyCont(data: number) {
    this.dataService.updateCurrencyConv(data);
  }

  ngOnInit(): void { 
    this.auth.userData.subscribe(user => {
      if (user != null){
        this.userService.users.subscribe(data => {
          this.user = data.filter((u: {id: string;}) => u.id == user.uid)[0];

          this.getTripsInCart();
        })
      } else {
        this.user = new User('guest', 'guest', 'guest', 'guest', [], []);
      }
      this.howManyTrips = 0;
    })

    this.dataService.getNotification().subscribe(data => {
      this.notification = data as boolean;
    })

    this.total();
    this.howManyInCart();
  }

  logOut() {
    this.auth.logOut();
  }

  displayCart(){
    this.displayCartFlag = true;
  }

  hideCart() {
    this.displayCartFlag = false;
  }

  getTripsInCart(){
    this.db.getUserCart(this.user).subscribe(change => {
      this.howManyTrips = 0;
      if (this.trips.length < 1) {
        for (let trip of change){
          this.trips.push(trip as Trip);
          this.howManyTrips += trip.addedToCart;
        }
      }else {
        this.trips = [];
        for (let trip of change){
          this.trips.push(trip as Trip);
          this.howManyTrips += trip.addedToCart;
        }
      }
      this.total();
    })  
  }

  changeCurrency(toCurrency: string){
    if (this.currentCurrency != toCurrency){
      if (toCurrency == "USD"){
        this.currencyConvert = 0.2;
        this.currentCurrency = "USD"
        this.updateCurrency(this.currentCurrency);
        this.updateCurrencyCont(this.currencyConvert);
      }
      else if (toCurrency == "PLN") {
        this.currencyConvert = 1;
        this.currentCurrency = "PLN";
        this.updateCurrency(this.currentCurrency);
        this.updateCurrencyCont(this.currencyConvert);
      } else if (toCurrency == "£") {
        this.currencyConvert = 0.2;
        this.currentCurrency = "£";
        this.updateCurrency(this.currentCurrency);
        this.updateCurrencyCont(this.currencyConvert);
      }
    }
  }

  howManyInCart(){
    this.howManyTrips = 0;
    for (let trip of this.trips){
      if( trip.addedToCart > 0){
        this.howManyTrips += trip.addedToCart;
      }
    }
    return this.howManyTrips;
  }

  total(){
    this.totalCost = 0
    for (let trip of this.trips){
      if( trip.addedToCart > 0){
        this.totalCost += trip.addedToCart * trip.cost;
      }
    }
    return this.totalCost
  }

  openMenu(){
    this.mobileMenuOpened = true;
  }
  closeMenu() {
    this.mobileMenuOpened = false;
  }
}
