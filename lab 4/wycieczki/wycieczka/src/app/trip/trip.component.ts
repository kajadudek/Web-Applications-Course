import { Component, OnInit } from '@angular/core';
import tripData from 'src/assets/trips.json';
import {faTrashCan,faShoppingCart} from '@fortawesome/free-solid-svg-icons'

export interface Trip{
  name: string;
  destinationCountry: string;
  startDate: string;
  endDate: string;
  cost: number;
  vacants: number;
  shortInfo: string;
  imgUrl: string;
  addedToCart: number;
  rating: number;
}

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})

export class TripComponent implements OnInit {
  data!: any;
  public trips: Trip[] = [];

  howManyTrips = 0;
  faTrashCan = faTrashCan;
  faShoppingCart = faShoppingCart;
  displayCartFlag = false;
  currentCurrency = "PLN";
  currencyConvert = 1;

  constructor() {
    this.data = tripData["Trips"];
  }

  ngOnInit(): void {
    for (let trip in this.data){
      this.trips.push({
        name: this.data[trip]["Name"],
        destinationCountry: this.data[trip]["Country"],
        startDate: this.data[trip]["startDate"],
        endDate: this.data[trip]["endDate"],
        cost: this.data[trip]["cost"],
        vacants: this.data[trip]["vacants"],
        shortInfo: this.data[trip]["info"],
        imgUrl: this.data[trip]["image"],
        addedToCart: 0,
        rating: 0
      } as Trip)
    }
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

  onSubmitHandler(trip: any) {
    console.log('trip dodany: ' + trip)
    this.trips.push(trip)
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
