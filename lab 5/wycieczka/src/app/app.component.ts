import { Component, OnInit } from '@angular/core';
import { ServicedataService, Trip } from './servicedata.service';
import {faShoppingCart, faPerson, faHome, faPlus, faPlane, faBell} from '@fortawesome/free-solid-svg-icons'
import { DataService } from './data.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FirebaseService } from './firebase.service';


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

  constructor(private dataService: DataService,
    private tripData: ServicedataService,
    private db: FirebaseService) {}

  updateCurrency(data: string){
    this.dataService.updateCurrency(data);
  }

  updateCurrencyCont(data: number) {
    this.dataService.updateCurrencyConv(data);
  }

  updateTripsInCart(data: number) {
    this.dataService.updateTripsInCart(data);
  }
  
  updateTrip(data: Trip) {
    this.dataService.updateTrip(data);
  }

  updateTotal(data: number) {
    this.dataService.updateTotal(data);
  }

  ngOnInit(): void { 
    this.db.getTrips().subscribe(change => {
      if (this.trips == undefined ||this.trips.length < 1) {
        for (let trip of change){
          this.trips.push(trip as Trip);
        }
      }else {
        this.trips = [];
        for (let trip of change){
          this.trips.push(trip as Trip);
        }
      }
      this.howManyInCart();
    })

    this.dataService.getTrip().subscribe(data => {
      this.tripToRmv = data as Trip;
      this.updateFromCart(this.tripToRmv);
    })

    this.dataService.getNotification().subscribe(data => {
      this.notification = data as boolean;
    })

    this.total();
    this.updateTotal(this.totalCost);
  }

  displayCart(){
    this.displayCartFlag = true;
  }

  hideCart() {
    this.displayCartFlag = false;
  }

  updateFromCart(selectedTrip: Trip) {
    selectedTrip.vacants += selectedTrip.addedToCart;
    selectedTrip.addedToCart = 0;
    this.total();
    this.updateTotal(this.totalCost);
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
}
