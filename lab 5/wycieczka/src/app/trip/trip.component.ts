import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { ServicedataService, Trip } from '../servicedata.service';


@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})

export class TripComponent implements OnInit {
  data!: any;
  public trips: Trip[] = [];
  howManyTrips = 0;

  @Input() howManyTripsDeleted!: number;
  @Input() countryFilter!: string[];
  @Input() currentCurrency!: string;
  @Input() currencyConvert!: number;
  @Output() sendHowManyTrips: EventEmitter<number> = new EventEmitter();

  faTrashCan = faTrashCan;
  displayCartFlag = false;

  constructor(public servicedata: ServicedataService) {
  }

  ngOnInit(): void {
    this.trips = this.servicedata.trips;
    this.howManyTrips -= this.howManyTripsDeleted;
  }

  updateHowManyTrips(i: number){
    this.sendHowManyTrips.emit(this.howManyTrips);
  }

  addTripToCart(selectedTrip: Trip) {
    selectedTrip.addedToCart += 1;
    selectedTrip.vacants -= 1;
    this.howManyTrips += 1;
    this.updateHowManyTrips(this.howManyTrips);
  }

  rmvTripFromCart(selectedTrip: Trip) {
    if(selectedTrip.addedToCart>0){
     selectedTrip.addedToCart -= 1;
     selectedTrip.vacants += 1; 
     this.howManyTrips -= 1;
     this.updateHowManyTrips(this.howManyTrips);
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
    this.updateHowManyTrips(this.howManyTrips);
  }

  getRating(rating: number, trip: Trip){
    trip.rating = rating
  }
}
