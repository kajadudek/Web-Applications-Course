import { Component, OnInit } from '@angular/core';
import { Trip } from './servicedata.service';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import { DataService } from './data.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  
  faShoppingCart = faShoppingCart;
  title = 'wycieczka';
  currentCurrency = "PLN";
  currencyConvert = 1;
  howManyTrips = 0;
  deletedTrips = 0;
  displayCartFlag = false;

  constructor(private dataService: DataService) {}

  updateCurrency(data: string){
    this.dataService.updateCurrency(data);
  }

  updateCurrencyCont(data: number) {
    this.dataService.updateCurrencyConv(data);
  }

  updateTripsInCart(data: number) {
    this.dataService.updateTripsInCart(data);
  }

  ngOnInit(): void { 
    this.dataService.getTripsInCart().subscribe(data => {
      this.howManyTrips = data as number;
    })
  }

  displayCart(){
    this.displayCartFlag = true;
  }

  hideCart() {
    this.displayCartFlag = false;
  }

  updateFromCart(selectedTrip: Trip) {
    this.deletedTrips += selectedTrip.addedToCart;
    this.howManyTrips -= selectedTrip.addedToCart;
    this.updateTripsInCart(this.howManyTrips);
    selectedTrip.vacants += selectedTrip.addedToCart;
    selectedTrip.addedToCart = 0;
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
}
