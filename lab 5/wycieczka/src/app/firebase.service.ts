import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { HttpClient } from '@angular/common/http';
import { Trip } from './servicedata.service';
import { first, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  trips: Trip[] = [];
  nextId: number | undefined;

  constructor(private db: AngularFireDatabase) {

    this.db.list('Trips').valueChanges().subscribe(change => {
      if (this.trips.length < 1) {
        for (let trip of change){
          this.trips.push(trip as Trip);
        }
      } else {
        this.trips = [];
        for (let trip of change){
          this.trips.push(trip as Trip);
        }
      }
    })
    console.log(this.trips);
   }

   getTrips(): Observable<any>{
    return this.db.list('Trips').valueChanges();
   }

   addToCart(selectedTrip: Trip, newValue: any){
    this.db.list('Trips').snapshotChanges().pipe(first()).subscribe((items:any) =>{
      for(let i of items){
        if(i.payload.val().id==selectedTrip.id){
          this.db.list('Trips').update(i.payload.key, {addedToCart: newValue});
          this.db.list('Trips').update(i.payload.key, {vacants: selectedTrip.vacants - 1});
        }
      }
    } )
  }

  removeFromCart(selectedTrip: Trip, newValue: any){
    this.db.list('Trips').snapshotChanges().pipe(first()).subscribe((items:any) =>{
      for(let i of items){
        if(i.payload.val().id==selectedTrip.id) {
          this.db.list('Trips').update(i.payload.key, {vacants: selectedTrip.vacants + newValue});
          this.db.list('Trips').update(i.payload.key, {addedToCart: selectedTrip.addedToCart - newValue});
        }
      }
    } )
  }

  buyTrip(selectedTrip: Trip, newValue: any){
    this.db.list('Trips').snapshotChanges().pipe(first()).subscribe((items:any) =>{
      for(let i of items){
        if(i.payload.val().id==selectedTrip.id){
          this.db.list('Trips').update(i.payload.key, {addedToCart: 0});
          this.db.list('Trips').update(i.payload.key, {bought: newValue});
        }
      }
    } )
  }

  addTrip(trip: Trip){
    this.db.list('Trips').push ({
          id: trip.id,
          name: trip.name,
          country: trip.country,
          startDate: trip.startDate,
          endDate: trip.endDate,
          cost: trip.cost,
          vacants: trip.vacants,
          info: trip.info,
          image: trip.image,
          addedToCart: trip.addedToCart,
          rating: trip.rating,
          bought: trip.bought
    })
  }

  deleteTrip(selectedTrip: Trip){
    this.db.list('Trips').snapshotChanges().pipe(first()).subscribe((items:any) =>{
      for(let i of items){
        if(i.payload.val().id==selectedTrip.id){
          this.db.list('Trips').remove(i.payload.key);
        }
      }
    } )
  }
}

