import { Component, Input, OnInit } from '@angular/core';
import tripData from 'src/assets/trips.json';
import {faTrashCan,faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import { ServicedataService, Trip } from '../servicedata.service';


@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})

export class TripComponent implements OnInit {
  data!: any;
  public trips: Trip[] = [];

  @Input() countryFilter!: string[];
  @Input() currentCurrency!: string;
  @Input() currencyConvert!: number;

  howManyTrips = 0;
  faTrashCan = faTrashCan;
  faShoppingCart = faShoppingCart;
  displayCartFlag = false;

  constructor(public servicedata: ServicedataService) {
  }

  ngOnInit(): void {
    this.trips = this.servicedata.trips;
  }

  addTripToCart(selectedTrip: Trip) {
    selectedTrip.addedToCart += 1;
    selectedTrip.vacants -= 1;
    this.howManyTrips += 1;
  }

  rmvTripFromCart(selectedTrip: Trip) {
    if(selectedTrip.addedToCart>0){
     selectedTrip.addedToCart -= 1;
     selectedTrip.vacants += 1; 
     this.howManyTrips -= 1;
    }
  }

  findMaxPrice() {
    let maxi = 0;
    let mostExpTrip = <Trip>{};
    for (let trip of this.trips){
      if(maxi < trip.cost && trip.vacants > 0){
        mostExpTrip = trip;
        maxi = trip.cost
      }
    }
    return mostExpTrip;
  }

  findMinPrice() {
    let mini = Number.MAX_VALUE;
    let leastExpTrip = <Trip>{};
    for (let trip of this.trips){
      if(mini > trip.cost && trip.vacants > 0){
        leastExpTrip = trip;
        mini = trip.cost
      }
    }
    return leastExpTrip;
  }

  deleteTrip(trip: Trip) {
    const id = this.trips.indexOf(trip,0);
    this.howManyTrips -= trip.addedToCart;
    this.trips.splice(id,1);
  }

  getRating(rating: number, trip: Trip){
    trip.rating = rating
  }

  displayCart(){
    this.displayCartFlag = true;
  }

  hideCart() {
    this.displayCartFlag = false;
  }

  updateFromCart(selectedTrip: Trip) {
    this.howManyTrips -= selectedTrip.addedToCart;
    selectedTrip.vacants += selectedTrip.addedToCart;
    selectedTrip.addedToCart = 0;
  }

  changeCurrency(toCurrency: string){
    if (this.currentCurrency != toCurrency){

      if (this.currentCurrency == "PLN"){
        this.currencyConvert = 0.2;
        this.currentCurrency = "USD"
      }
      else {
        this.currencyConvert = 1;
        this.currentCurrency = "PLN";
      }
    }
  }

  

}
