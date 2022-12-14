import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import tripData from 'src/assets/trips.json';

export interface Trip{
  id: number;
  name: string;
  country: string;
  startDate: string;
  endDate: string;
  cost: number;
  vacants: number;
  info: string;
  image: string;
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
        id: this.data[trip]["id"],
        name: this.data[trip]["name"],
        country: this.data[trip]["country"],
        startDate: this.data[trip]["startDate"],
        endDate: this.data[trip]["endDate"],
        cost: this.data[trip]["cost"],
        vacants: this.data[trip]["vacants"],
        info: this.data[trip]["info"],
        image: this.data[trip]["image"],
        addedToCart: 0,
        rating: 0,
        bought: 0
      } as Trip)
    }
  }

  // getTrips(id: number): Observable<Trip> {
  //   const hero = this.trips.find(h => h.vacants === id)!;
  //   console.log(`HeroService: fetched hero id=${id}`);
  //   return of(hero);
  // }
}
