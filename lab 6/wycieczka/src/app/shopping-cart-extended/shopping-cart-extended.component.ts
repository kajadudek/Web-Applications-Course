import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { first } from 'rxjs';
import { AuthService, User } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { FirebaseService } from '../services/firebase.service';
import { Trip, ServicedataService } from '../services/servicedata.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-shopping-cart-extended',
  templateUrl: './shopping-cart-extended.component.html',
  styleUrls: ['./shopping-cart-extended.component.css'],
  providers: [DatePipe]
})
export class ShoppingCartExtendedComponent implements OnInit {
  tripsInCart: Trip[] = [];
  boughtTrips: any[] = [];
  totalCost = 0;
  currencyConvert = 1;
  currentCurrency = "PLN";
  todaysDate!: any;
  date = new Date();
  filter: boolean[] = [false, false, false];
  user = new User('guest', 'guest', 'guest', 'guest', [], []);

  constructor(public servicedata: ServicedataService,
    private dataService: DataService,
    private db: FirebaseService,
    private fb: AngularFireDatabase,
    private datePipe: DatePipe,
    private userService: UserService,
    private auth: AuthService) {
    }

  updateSelectedTrip(data: Trip) {
    this.dataService.updateTrip(data);
  }

  updateTripsInCart(data: number) {
    this.dataService.updateTripsInCart(data);
  }

  updateNotification(data: boolean) {
    this.dataService.updateNotification(data);
  }

  ngOnInit(): void {
    this.auth.userData.subscribe(user => {
      if (user != null){
        this.userService.users.subscribe(data => {
          this.user = data.filter((u: {id: string;}) => u.id == user.uid)[0];

          this.getTripsInCart();
          
          if (this.user.history.length < 1) {
            for (let trip of this.user.history){
              this.boughtTrips.push(trip);
              this.statusCheck(trip);
              this.isSoon(trip);
            }
          }else {
            this.boughtTrips = [];
            for (let trip of this.user.history){
              this.boughtTrips.push(trip);
              this.statusCheck(trip);
              this.isSoon(trip);
            }
          }
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

    this.dataService.getTotal().subscribe((data) => {
      this.totalCost = data as number;
    })
  }

  total(){
    this.totalCost = 0
    for (let trip of this.tripsInCart){
      if( trip.addedToCart > 0){
        this.totalCost += trip.addedToCart * trip.cost;
      }
    }
    return this.totalCost
  }

  getTripsInCart(){
    this.db.getUserCart(this.user).subscribe(change => {
      if (this.tripsInCart.length < 1) {
        for (let trip of change){
          this.tripsInCart.push(trip as Trip);
        }
      }else {
        this.tripsInCart = [];
        for (let trip of change){
          this.tripsInCart.push(trip as Trip);
        }
      }
      this.total();
    }) 
  }

  buyTrips() {
    for (let trip of this.tripsInCart){
      if( trip.addedToCart > 0){        

        this.db.buyTrip(trip, trip.addedToCart);
        trip.dateOfBought = this.datePipe.transform(this.date, 'yyyy-MM-dd');

        this.db.addBought(this.user, trip);
        trip.bought = trip.addedToCart;
        trip.addedToCart = 0;
      }
    }
    this.total();
  }

  deleteTripFromCart(selectedTrip: Trip){
    // this.db.removeFromCart(selectedTrip, selectedTrip.addedToCart);
    this.db.removeFromUserCart(this.user, selectedTrip, 0);
    this.total();
  }

  statusCheck(selectedTrip: any) {
    const startDate = new Date(selectedTrip.startDate);
    const endDate = new Date(selectedTrip.endDate);

    if ( startDate <= this.date && endDate >= this.date){
      this.db.tripStatus(this.user, selectedTrip, false, false, true);
    } else if (endDate < this.date) {
      this.db.tripStatus(this.user, selectedTrip, true, false, false);
    } else if (startDate > this.date){
      this.db.tripStatus(this.user, selectedTrip, false, true, false);
    }
  }

  isSoon(selectedTrip: any) {
    if(selectedTrip.toBe){
      if (((new Date(selectedTrip.startDate).getTime() - this.date.getTime()) / 1000 / 60 / 60 / 24) <= 14 ) {
        this.updateNotification(true);
        selectedTrip.lessThan2Weeks = true;
        return;
      }
    }
    selectedTrip.lessThan2Weeks = false;
  }

  updateFilter(idx: number){
    this.filter[idx] = !this.filter[idx];
  }
}
