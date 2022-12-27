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

  constructor(private db: AngularFireDatabase) {

    // this.db.list('Trips').valueChanges().subscribe(change => {
    //   if (this.trips.length < 1) {
    //     for (let trip of change){
    //       this.trips.push(trip as Trip);
    //     }
    //   } else {
    //     this.trips = [];
    //     for (let trip of change){
    //       this.trips.push(trip as Trip);
    //     }
    //   }
    // })
    // console.log(this.trips);
   }

   getTrips(): Observable<any>{
    return this.db.list('Trips').valueChanges();
   }

   getBoughtTrips(): Observable<any>{
    return this.db.list('Bought').valueChanges();
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

  rateTrip(selectedTrip: Trip, newValue: any){
    this.db.list('Trips').snapshotChanges().pipe(first()).subscribe((items:any) =>{
      for(let i of items){
        if(i.payload.val().id==selectedTrip.id){
          this.db.list('Trips').update(i.payload.key, {rating: newValue});
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
          images: trip.images,
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

  addBought(trip: Trip) {
    this.db.list('Bought').push ({
          id: trip.id,
          name: trip.name,
          country: trip.country,
          startDate: trip.startDate,
          endDate: trip.endDate,
          cost: trip.cost,
          addedToCart: trip.addedToCart,
          dateOfBought: trip.dateOfBought,
          toBe: false,
          ended: false,
          during: false,
          lessThan2Weeks: false
    })
  }

  tripStatus(selectedTrip: Trip, end: boolean, willBe: boolean, inProgress: boolean){
    this.db.list('Bought').snapshotChanges().pipe(first()).subscribe((items:any) =>{
      for(let i of items){
        if(i.payload.val().id==selectedTrip.id){
          this.db.list('Bought').update(i.payload.key, {ended: end});
          this.db.list('Bought').update(i.payload.key, {toBe: willBe});
          this.db.list('Bought').update(i.payload.key, {during: inProgress});
        }
      }
    } )
  }

  updateTrip(selectedTrip: Trip, name: any, country: any, dateOfStart: any, dateOfEnd: any, cost: any,
            vacants: any, description: any, image: any, images: any){
    this.db.list('Trips').snapshotChanges().pipe(first()).subscribe((items:any) =>{
      for(let i of items){
        if(i.payload.val().id==selectedTrip.id){
          this.db.list('Trips').update(i.payload.key, {name: name});
          this.db.list('Trips').update(i.payload.key, {country: country});
          this.db.list('Trips').update(i.payload.key, {startDate: dateOfStart});
          this.db.list('Trips').update(i.payload.key, {endDate: dateOfEnd});
          this.db.list('Trips').update(i.payload.key, {cost: cost});
          this.db.list('Trips').update(i.payload.key, {vacants: vacants});
          this.db.list('Trips').update(i.payload.key, {info: description});
          this.db.list('Trips').update(i.payload.key, {country: country});
          this.db.list('Trips').update(i.payload.key, {image: image});
          this.db.list('Trips').update(i.payload.key, {images: images});
        }
      }
    } )
  }
}

