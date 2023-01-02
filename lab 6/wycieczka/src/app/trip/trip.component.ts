import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { first } from 'rxjs';
import { AuthService, User } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { FirebaseService } from '../services/firebase.service';
import { ServicedataService, Trip } from '../services/servicedata.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})

export class TripComponent implements OnInit {
  data!: any;
  public trips: Trip[] = [];
  cart: Trip[] = [];
  tripsInCart: Trip[] = [];
  howManyTrips: any;
  currentCurrency = "PLN";
  currencyConvert = 1;
  starHeight = 27;
  user = new User('guest', 'guest', 'guest', 'guest', [], []);

  faTrashCan = faTrashCan;
  displayCartFlag = false;


  constructor(public servicedata: ServicedataService, private dataService: DataService,
    private db: FirebaseService,
    private fb: AngularFireDatabase,
    private auth: AuthService,
    private userService: UserService) {}

  updateCountryFilter(data: string[]) {
    this.dataService.updateCountryFilter(data);
  }

  ngOnInit(): void {
    this.db.getTrips().subscribe(change => {
      if (this.trips == undefined ||this.trips.length < 1) {
        for (let trip of change){
          this.trips.push(trip as Trip);
        }
      }else {
        this.trips = [];
        for (let trip of change){
          this.trips.push(trip as Trip);
        }
      }
    })

    this.auth.userData.subscribe(user => {
      if (user != null){
        this.userService.users.subscribe((data: any[]) => {
          this.user = data.filter((u: {id: string;}) => u.id == user.uid)[0];

          this.db.getUserCart(this.user).subscribe(change => {
              this.tripsInCart = [];
              for (let trip of change){
                this.tripsInCart.push(trip as Trip);
            }
          }) 
        })
      } else {
        this.user = new User('guest', 'guest', 'guest', 'guest', [], []);
      }
    })


    this.dataService.getCurrency().subscribe((data) => {
      this.currentCurrency = data as string;
    })

    this.dataService.getCurrencyConv().subscribe((data) => {
      this.currencyConvert = data as number;
    })

    this.dataService.getCountryFilter().subscribe(data => {
      this.countryFilter = data as string[];
    })
  }

  addTripToCart(selectedTrip: Trip) {
    selectedTrip.addedToCart += 1;
    this.db.addToCart(selectedTrip, selectedTrip.addedToCart);
    this.db.addToUserCart(this.user, selectedTrip);
    this.howManyTrips += 1;
  }

  rmvTripFromCart(selectedTrip: Trip) {
    for (let trip of this.tripsInCart) {
      if (trip.id == selectedTrip.id){
        if (trip.addedToCart > 0){
          this.db.removeFromUserCart(this.user, selectedTrip, -1);
          this.howManyTrips -=1 ;
          break;
        }
      }
    }
  }

  findMaxPrice() {
    let maxi = 0;
    let mostExpTrip = <Trip>{};
    for (let trip of this.trips){
      if(maxi < trip.cost && trip.vacants > 0){
        mostExpTrip = trip;
        maxi = trip.cost
      }
    }
    return mostExpTrip;
  }

  findMinPrice() {
    let mini = Number.MAX_VALUE;
    let leastExpTrip = <Trip>{};
    for (let trip of this.trips){
      if(mini > trip.cost && trip.vacants > 0){
        leastExpTrip = trip;
        mini = trip.cost
      }
    }
    return leastExpTrip;
  }

  deleteTrip(trip: Trip) {
    const id = this.trips.indexOf(trip,0);
    this.db.deleteTrip(trip);
    this.trips.splice(id,1);
  }

  getRating(rating: number, trip: Trip){
    let newRate = Math.round((trip.rating + rating)/trip.bought);
    trip.rating = newRate;
    this.db.rateTrip(trip, trip.rating);
  }

  //FILTER
  countryFilter = [''];

  getCountryFilter(list: string[]){
    this.countryFilter = list;
    this.updateCountryFilter(this.countryFilter);
  }
}
