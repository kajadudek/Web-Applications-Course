import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { HttpClient } from '@angular/common/http';
import { Trip } from './servicedata.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  tripsList!: AngularFireList<any>;
  trip!: Trip;
  trips: Trip[] = [];
  nextId: number | undefined;

  constructor(private db: AngularFireDatabase) {

    console.log(this.db);
    this.db.list('Trips').valueChanges().subscribe(change => {
      if (this.trips.length < 1) {
        for (let trip of change){
          this.trips.push(trip as Trip);
        }
      }
      console.log(this.trips);
    })
   }

   getTrips(){
    return this.trips;
   }

  //  addTrip(trip: Trip){
  //   this.db.list('Trips').push({
  //     id: this.trips.length + 1,
  //         name: trip.name,
  //         country: trip.country,
  //         startDate: trip.startDate,
  //         endDate: trip.endDate,
  //         cost: trip.cost,
  //         vacants: trip.vacants,
  //         info: trip.info,
  //         image: trip.image,
  //         addedToCart: 0,
  //         rating: 0,
  //         bought: 0
  //   })
  //  }
}

