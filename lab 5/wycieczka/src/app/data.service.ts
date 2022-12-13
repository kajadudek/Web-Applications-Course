import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Trip } from './servicedata.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private currencyObs = new Subject();
  private currencyConvert = new Subject();
  private totalTripsObs = new Subject();
  private countryFilter = new Subject();
  private trips = new Subject();

  constructor() { }

    getCurrency() {
      return this.currencyObs;
    }

    updateCurrency(data: string){
      this.currencyObs.next(data);
    }

    getCurrencyConv() {
      return this.currencyConvert;
    }

    updateCurrencyConv(data: number){
      this.currencyConvert.next(data);
    }

    getTripsInCart() {
      return this.totalTripsObs;
    }

    updateTripsInCart(data: number){
      this.totalTripsObs.next(data);
    }

    getCountryFilter() {
      return this.countryFilter;
    }

    updateCountryFilter(data: string[]){
      this.countryFilter.next(data);
    }

    getTrip() {
      return this.trips;
    }
  
    updateTrip(data: Trip){
      this.trips.next(data);
      console.log(data);
    }
}
