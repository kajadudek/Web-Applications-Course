import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faTachographDigital } from '@fortawesome/free-solid-svg-icons';
import { first, Subscription } from 'rxjs';
import { AuthService, User } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { FirebaseService } from '../services/firebase.service';
import { ServicedataService, Trip } from '../services/servicedata.service';
import { UserService } from '../services/user.service';

interface comment {
  nick: string;
  tripName: string;
  opinion: string;
  date: any;
}

@Component({
  selector: 'app-trip-info',
  templateUrl: './trip-info.component.html',
  styleUrls: ['./trip-info.component.css']
})
export class TripInfoComponent implements OnInit {

  constructor(private route: ActivatedRoute, 
    private db: FirebaseService,
    private dataService: DataService,
    private auth: AuthService,
    private userService: UserService) { }

  tripId!: number;
  trips: Trip[] = [];
  trip!: Trip;
  height = 40;
  tripName!: any;
  tripNameError = false;
  comments: comment[] = [];
  images: string[] = [];
  currImg = 0;
  currentCurrency = "PLN";
  currencyConvert = 1;
  user = new User('guest', 'guest', 'guest', 'guest', [], []);

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tripId = params['id']
      
      this.db.getTrips().subscribe(change => {
          for (let trip of change) {
            if (trip.id == this.tripId){
              this.trip = trip;
              
              for (let img of trip.images) {
                this.images.push(img);
                console.log(this.images)
              }
              break;
            }
          }
      })
    })

    this.auth.userData.subscribe(user => {
      if (user != null){
        this.userService.users.subscribe((data: any[]) => {
          this.user = data.filter((u: {id: string;}) => u.id == user.uid)[0];
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
  }

  addTripToCart(selectedTrip: Trip) {
    selectedTrip.addedToCart += 1;
    this.db.addToCart(selectedTrip, selectedTrip.addedToCart);
    this.db.addToUserCart(this.user, selectedTrip);
  }

  rmvTripFromCart(selectedTrip: Trip) {
    if(selectedTrip.addedToCart>0){
      this.db.removeFromUserCart(this.user, selectedTrip, -1)
    }
  }

  getRating(rating: number, trip: Trip){
    let newRate = Math.round((trip.rating + rating)/trip.bought);
    trip.rating = newRate;
    this.db.rateTrip(trip, trip.rating);
  }

  nextImg() {
    this.currImg += 1;
    if (this.currImg >= this.images.length){
      this.currImg = 0;
    }
  }

  prevImg() {
    this.currImg -=1;
    if (this.currImg < 0) {
      this.currImg = this.images.length-1;
    }
  }



  // FORM

  opinionForm = new FormGroup({
    nick: new FormControl('', 
    [
      Validators.required,
      Validators.maxLength(35)
    ]),
    tripName: new FormControl('',
    [
      Validators.required,
    ]),
    opinion: new FormControl('',
    [
      Validators.required,
      Validators.maxLength(500),
      Validators.minLength(50)
    ]),
    date: new FormControl('')
  });

  changeTripName(tripName: any){
    this.tripName?.setValue(tripName.target.value, {
      onlySelf: true,
    });
    this.tripNameError = false;
    console.log(this.tripName)
  }

  onSubmit() {
    this.tripNameError = false;
    if (this.opinionForm.valid){
      this.comments.push({
        nick: this.opinionForm.get('nick')!.value as string,
        tripName: this.opinionForm.get('tripName')!.value as string,
        opinion: this.opinionForm.get('opinion')!.value as string,
        date: this.opinionForm.get('date')!.value
      })

      console.log(this.comments);
      this.opinionForm.reset();
    } else {
      if (this.opinionForm.get('tripName') == null || this.opinionForm.get('tripName')!.value == ""){
        this.tripNameError = true;
        console.log(this.tripNameError);

      }
    }
  }

  get name(){
    return this.opinionForm.get('nick');
  }

  get opinion(){
    return this.opinionForm.get('opinion');
  }
}
