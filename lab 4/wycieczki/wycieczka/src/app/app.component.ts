import { Component } from '@angular/core';
import { Trip } from './servicedata.service';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  faShoppingCart = faShoppingCart;
  title = 'wycieczka';
  currentCurrency = "PLN";
  currencyConvert = 1;
  howManyTrips = 0;
  deletedTrips = 0;
  displayCartFlag = false;

  displayCart(){
    this.displayCartFlag = true;
  }

  hideCart() {
    this.displayCartFlag = false;
  }

  updateFromCart(selectedTrip: Trip) {
    this.deletedTrips += selectedTrip.addedToCart;
    this.howManyTrips -= selectedTrip.addedToCart;
    console.log(selectedTrip, selectedTrip.addedToCart)
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

  getHowManyTrips(i: number){
    this.howManyTrips = i - this.deletedTrips;
  }

  //FILTER
  countryFilter = [''];

  getCountryFilter(list: string[]){
    this.countryFilter = list;
  }
}
