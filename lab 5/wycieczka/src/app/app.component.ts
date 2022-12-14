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
    // this.trips = this.tripData.trips;
    this.trips = this.db.getTrips();

    this.dataService.getTripsInCart().subscribe(data => {
      this.howManyTrips = data as number;
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
    // this.deletedTrips += selectedTrip.addedToCart;
    this.howManyTrips -= selectedTrip.addedToCart;
    this.updateTripsInCart(this.howManyTrips);
    selectedTrip.vacants += selectedTrip.addedToCart;
    selectedTrip.addedToCart = 0;
    this.total();
    this.updateTotal(this.totalCost);
  }

  changeCurrency(toCurrency: string){
    if (this.currentCurrency != toCurrency){

      if (this.currentCurrency == "PLN"){
        this.currencyConvert = 0.2;
        this.currentCurrency = "USD"
        this.updateCurrency(this.currentCurrency);
        this.updateCurrencyCont(this.currencyConvert);
      }
      else {
        this.currencyConvert = 1;
        this.currentCurrency = "PLN";
        this.updateCurrency(this.currentCurrency);
        this.updateCurrencyCont(this.currencyConvert);
      }
    }
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
