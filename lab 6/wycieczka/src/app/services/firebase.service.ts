import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { HttpClient } from '@angular/common/http';
import { Trip } from './servicedata.service';
import { first, Observable } from 'rxjs';
import { User } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  trips: Trip[] = [];

  constructor(private db: AngularFireDatabase) {
   }

   getTrips(): Observable<any>{
    return this.db.list('Trips').valueChanges();
   }

   getBoughtTrips(): Observable<any>{
    return this.db.list('Bought').valueChanges();
   }

   addToCart(selectedTrip: Trip, newValue: any){
    this.db.list('Trips').snapshotChanges().pipe(first()).subscribe((items: any) =>{
      for(let i of items){
        if(i.payload.val().id==selectedTrip.id){
          this.db.list('Trips').update(i.payload.key, {addedToCart: newValue});
          this.db.list('Trips').update(i.payload.key, {vacants: selectedTrip.vacants - 1});
          }
        }
      })
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

  clearCart(){
    this.db.list('Trips').snapshotChanges().pipe(first()).subscribe((items: any) =>{
      for(let i of items){
          this.db.list('Trips').update(i.payload.key, {vacants:  i.payload.val().vacants + i.payload.val().addedToCart});
          this.db.list('Trips').update(i.payload.key, {addedToCart: 0});
        }
      })
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

  userRate(selectedTripId: number, user: User, rate: number){
    this.db.list('users/' + user.id + '/history').snapshotChanges().pipe(first()).subscribe((items:any) =>{
      for(let i of items){
        if(i.payload.key==selectedTripId){
          this.db.list('users/' + user.id + '/history').update(i.payload.key, {rated: rate});
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

  tripStatus(user: User, selectedTrip: any, end: boolean, willBe: boolean, inProgress: boolean){
    this.db.list('users/' + user.id + '/history').snapshotChanges().pipe(first()).subscribe((items:any) =>{
      for(let i of items){
        if(i.payload.key==selectedTrip.boughtID){
          this.db.list('users/' + user.id + '/history').update(i.payload.key, {ended: end});
          this.db.list('users/' + user.id + '/history').update(i.payload.key, {toBe: willBe});
          this.db.list('users/' + user.id + '/history').update(i.payload.key, {during: inProgress});
        }
      }
    } )
  }

  addBought(user: User, trip: Trip) {
    let len = user.history.length;
    user.history.push({
      id: trip.id,
      name: trip.name,
      country: trip.country,
      startDate: trip.startDate,
      endDate: trip.endDate,
      cost: trip.cost,
      addedToCart: trip.addedToCart,
      dateOfBought: trip.dateOfBought,
      boughtID: len,
      toBe: false,
      ended: false,
      during: false,
      lessThan2Weeks: false,
      rated: 0,
    })
    this.db.list('users').update(user.id, {history: user.history}) 
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

