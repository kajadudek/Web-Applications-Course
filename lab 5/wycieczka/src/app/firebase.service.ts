import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { HttpClient } from '@angular/common/http';
import { Trip } from './servicedata.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  tripsList!: AngularFireList<any>;
  trips: Trip[] = [];
  private nextId: any;

  constructor(private db: AngularFireDatabase,
    private httpCLient: HttpClient) {

    console.log(this.db);
    this.db.list('Trips').valueChanges().subscribe(change => {
      for (let trip of change){
        this.trips.push(trip as Trip);
      }
    })
   }

   getTrips(){
    return this.trips;
   }
}

