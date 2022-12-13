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
  totalCost = 0;
  currencyConvert = 1;
  currentCurrency = "PLN";

  constructor(public servicedata: ServicedataService,
    private dataService: DataService) {
  }

  updateSelectedTrip(data: Trip) {
    console.log("klik", data);
    this.dataService.updateTrip(data);
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
}
