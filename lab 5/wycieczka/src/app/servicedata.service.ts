import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import tripData from 'src/assets/trips.json';

export interface Trip{
  name: string;
  destinationCountry: string;
  startDate: string;
  endDate: string;
  cost: number;
  vacants: number;
  shortInfo: string;
  imgUrl: string;
  addedToCart: number;
  rating: number;
  bought: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServicedataService {
  public data = tripData["Trips"];
  public trips: Trip[] = [];

  constructor() { 
    for (let trip in this.data){
      this.trips.push({
        name: this.data[trip]["Name"],
        destinationCountry: this.data[trip]["Country"],
        startDate: this.data[trip]["startDate"],
        endDate: this.data[trip]["endDate"],
        cost: this.data[trip]["cost"],
        vacants: this.data[trip]["vacants"],
        shortInfo: this.data[trip]["info"],
        imgUrl: this.data[trip]["image"],
        addedToCart: 0,
        rating: 0,
        bought: 0
      } as Trip)
    }
  }
}
