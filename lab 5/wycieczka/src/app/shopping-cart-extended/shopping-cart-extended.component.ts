import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Trip, ServicedataService } from '../servicedata.service';

@Component({
  selector: 'app-shopping-cart-extended',
  templateUrl: './shopping-cart-extended.component.html',
  styleUrls: ['./shopping-cart-extended.component.css']
})
export class ShoppingCartExtendedComponent implements OnInit {
  tripsInCart!: Trip[];
  boughtTrips: Trip[] = [];
  totalCost = 0;
  currencyConvert = 1;
  currentCurrency = "PLN";
  todaysDate!: any;
  date = new Date();

  constructor(public servicedata: ServicedataService,
    private dataService: DataService) {
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
    this.tripsInCart = this.servicedata.trips;
    this.total();

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
    this.updateTripsInCart(0);
    for (let trip of this.tripsInCart){
      if( trip.addedToCart > 0){        
        trip.bought = trip.addedToCart;
        trip.addedToCart = 0;

        if (this.isSoon(trip)){
          this.updateNotification(true);
        }
      }
    }
    this.total();
  }

  isSoon(selectedTrip: Trip){
    let tripDate = Number(selectedTrip.startDate.slice(3,5));
    
    if (
      (((tripDate - this.date.getMonth()-1) == 0 
    || (tripDate - this.date.getMonth()-1) == -1 ) 
    && (Number(selectedTrip.startDate.slice(6,10)) - this.date.getFullYear()) == 0)

    || ((tripDate - this.date.getMonth()-1) == -11 
    && (Number(selectedTrip.startDate.slice(6,10)) - this.date.getFullYear()) == 1))
    {
      return true;
    }
    return false;
  }
}
