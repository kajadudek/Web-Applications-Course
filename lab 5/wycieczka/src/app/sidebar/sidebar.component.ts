import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServicedataService, Trip } from '../servicedata.service';
import { TripComponent } from '../trip/trip.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  uniqueCountries!: string[];
  filteredCountryList!: string[];
  tripList!: Trip[];

  constructor(public servicedata: ServicedataService) {
  }

  @Output() sendCountryFilter: EventEmitter<string[]> = new EventEmitter();

  ngOnInit(): void {
    this.tripList = this.servicedata.trips;
    this.uniqueCountries = [...new Set(this.tripList.map(trip => trip.country))];
  }

  updateListOfCountries(selectedCountry: string){
    if (this.filteredCountryList === undefined || this.filteredCountryList.length == 0){
      this.filteredCountryList = [selectedCountry];
      this.sendCountryFilter.emit(this.filteredCountryList);

      return;
    }
    for (let country of this.filteredCountryList){
      if (selectedCountry == country){
        const id = this.filteredCountryList.indexOf(selectedCountry,0);
        this.filteredCountryList.splice(id,1);
        this.sendCountryFilter.emit(this.filteredCountryList);

        return;
      }
    }
    this.filteredCountryList.push(selectedCountry);
    this.sendCountryFilter.emit(this.filteredCountryList);
    return;
  }

}
