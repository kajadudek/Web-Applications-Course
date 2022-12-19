import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FirebaseService } from '../firebase.service';
import { Trip, ServicedataService } from '../servicedata.service';

@Component({
  selector: 'app-shopping-cart-extended',
  templateUrl: './shopping-cart-extended.component.html',
  styleUrls: ['./shopping-cart-extended.component.css'],
  providers: [DatePipe]
})
export class ShoppingCartExtendedComponent implements OnInit {
  tripsInCart: Trip[] = [];
  boughtTrips: any[] = [];
  totalCost = 0;
  currencyConvert = 1;
  currentCurrency = "PLN";
  todaysDate!: any;
  date = new Date();
  filter: boolean[] = [false, false, false];

  constructor(public servicedata: ServicedataService,
    private dataService: DataService,
    private db: FirebaseService,
    private datePipe: DatePipe) {
    }

  updateSelectedTrip(data: Trip) {
    this.dataService.updateTrip(data);
  }

  updateTripsInCart(data: number) {
    this.dataService.updateTripsInCart(data);
  }

  updateNotification(data: boolean) {
    this.dataService.updateNotification(data);
  }

  ngOnInit(): void {
    this.db.getTrips().subscribe(change => {
      if (this.tripsInCart.length < 1) {
        for (let trip of change){
          this.tripsInCart.push(trip as Trip);
        }
      }else {
        this.tripsInCart = [];
        for (let trip of change){
          this.tripsInCart.push(trip as Trip);
        }
      }
      this.total();
    })  

    this.db.getBoughtTrips().subscribe(change => {
      this.updateNotification(false);
      if (this.boughtTrips.length < 1) {
        for (let trip of change){
          this.boughtTrips.push(trip as Trip);
          this.statusCheck(trip);
          this.isSoon(trip);
        }
      }else {
        this.boughtTrips = [];
        for (let trip of change){
          this.boughtTrips.push(trip as Trip);
          this.statusCheck(trip);
          this.isSoon(trip);
        }
      }
    })  

    this.dataService.getCurrency().subscribe((data) => {
      this.currentCurrency = data as string;
    })

    this.dataService.getCurrencyConv().subscribe((data) => {
      this.currencyConvert = data as number;
    })

    this.dataService.getTotal().subscribe((data) => {
      this.totalCost = data as number;
    })
  }

  total(){
    this.totalCost = 0
    for (let trip of this.tripsInCart){
      if( trip.addedToCart > 0){
        this.totalCost += trip.addedToCart * trip.cost;
      }
    }
    return this.totalCost
  }

  buyTrips() {
    for (let trip of this.tripsInCart){
      if( trip.addedToCart > 0){        

        this.db.buyTrip(trip, trip.bought + trip.addedToCart);
        trip.dateOfBought = this.datePipe.transform(this.date, 'yyyy-MM-dd')
        this.db.addBought(trip)
        trip.bought = trip.addedToCart;
        trip.addedToCart = 0;
      }
    }
    this.total();
  }

  deleteTripFromCart(selectedTrip: Trip){
    this.db.removeFromCart(selectedTrip, selectedTrip.addedToCart);
    this.total();
  }

  statusCheck(selectedTrip: any) {
    const startDate = new Date(selectedTrip.startDate);
    const endDate = new Date(selectedTrip.endDate);

    if ( startDate <= this.date && endDate >= this.date){
      this.db.tripStatus(selectedTrip, false, false, true);
      // this.updateNotification(true);
    } else if (endDate < this.date) {
      this.db.tripStatus(selectedTrip, true, false, false);
    } else if (startDate > this.date){
      this.db.tripStatus(selectedTrip, false, true, false);
    }
  }

  isSoon(selectedTrip: any) {
    if(selectedTrip.toBe){
      if (((new Date(selectedTrip.startDate).getTime() - this.date.getTime()) / 1000 / 60 / 60 / 24) <= 14 ) {
        this.updateNotification(true);
        selectedTrip.lessThan2Weeks = true;
        return;
      }
    }
    selectedTrip.lessThan2Weeks = false;
  }

  updateFilter(idx: number){
    this.filter[idx] = !this.filter[idx];
  }
}
