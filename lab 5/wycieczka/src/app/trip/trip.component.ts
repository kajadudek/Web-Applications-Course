import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { first } from 'rxjs';
import { DataService } from '../data.service';
import { FirebaseService } from '../firebase.service';
import { ServicedataService, Trip } from '../servicedata.service';


@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})

export class TripComponent implements OnInit {
  data!: any;
  public trips: Trip[] = [];
  cart: Trip[] = [];
  howManyTrips = 0;
  currentCurrency = "PLN";
  currencyConvert = 1;
  starHeight = 27;

  faTrashCan = faTrashCan;
  displayCartFlag = false;


  constructor(public servicedata: ServicedataService, private dataService: DataService,
    private db: FirebaseService,
    private fb: AngularFireDatabase) {}

  updateTripsInCart(data: number) {
    this.dataService.updateTripsInCart(data);
  }

  updateCountryFilter(data: string[]) {
    this.dataService.updateCountryFilter(data);
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
    })

    this.dataService.getCurrency().subscribe((data) => {
      this.currentCurrency = data as string;
    })

    this.dataService.getCurrencyConv().subscribe((data) => {
      this.currencyConvert = data as number;
    })

    this.dataService.getTripsInCart().subscribe(data => {
      this.howManyTrips = data as number;
    })

    this.dataService.getCountryFilter().subscribe(data => {
      this.countryFilter = data as string[];
    })
  }

  addTripToCart(selectedTrip: Trip) {
    selectedTrip.addedToCart += 1;
    this.db.addToCart(selectedTrip, selectedTrip.addedToCart);
  }

  rmvTripFromCart(selectedTrip: Trip) {
    if(selectedTrip.addedToCart>0){
      this.db.removeFromCart(selectedTrip, 1);
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
    this.db.deleteTrip(trip);
    this.trips.splice(id,1);
  }

  getRating(rating: number, trip: Trip){
    trip.rating = rating
  }

  //FILTER
  countryFilter = [''];

  getCountryFilter(list: string[]){
    this.countryFilter = list;
    this.updateCountryFilter(this.countryFilter);
  }
}
