import { Component, OnInit } from '@angular/core';
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
}

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {
  data!: any;
  trips: Trip[] = [];

  constructor() {
    this.data = tripData["Trips"];
  }

  ngOnInit(): void {
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
      } as Trip)
    }
  }
}
