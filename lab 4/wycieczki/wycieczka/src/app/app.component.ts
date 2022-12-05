import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wycieczka';
  currentCurrency = "PLN";
  currencyConvert = 1;


  //FILTER
  countryFilter = [''];

  getCountryFilter(list: string[]){
    this.countryFilter = list;
  }
}
