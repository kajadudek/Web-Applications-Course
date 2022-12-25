import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Output, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, AbstractControl} from '@angular/forms';
import { Validators } from '@angular/forms';
import { FirebaseService } from '../firebase.service';
import { ServicedataService, Trip } from '../servicedata.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { TripComponent } from '../trip/trip.component';
import { DataService } from '../data.service';


@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})

export class AddTripComponent {
  isDateValid = true;
  trips: Trip[] = [];

  constructor(public servicedata: ServicedataService,
    private dataService: DataService,
    private dbf: AngularFireDatabase,
    private db: FirebaseService) {
  }

  ngOnInit(): void {
    // this.trips = this.servicedata.trips;
    // this.trips = this.db.getTrips();

    this.db.getTrips().subscribe(change => {
      if (this.trips == undefined || this.trips.length < 1) {
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

  addingTripForms = new FormGroup({
    name: new FormControl('', 
    [
      Validators.required,
      Validators.pattern("[A-Za-z \p{L}]+"),
      Validators.maxLength(20)
    ]),
    country: new FormControl('',
    [
      Validators.required,
      Validators.pattern("[A-Za-z \p{L}]+")
    ]),
    startDate: new FormControl('',
    [
      Validators.required,
      // Validators.pattern("([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[\/]{1}[0-9]{2}[\/]{1}[0-9]{4}")
    ]),
    endDate: new FormControl('',
    [
      Validators.required,
      // Validators.pattern("([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[\/]{1}[0-9]{2}[\/]{1}[0-9]{4}")
    ]),
    cost: new FormControl('',
    [
      Validators.required,
      Validators.pattern("[0-9]+([.]{1}[0-9]{2})?")
    ]),
    vacants: new FormControl('',
    [
      Validators.required,
      Validators.pattern("[0-9]+")
    ]),
    shortInfo: new FormControl('',
    [
      Validators.required,
      Validators.maxLength(255)
    ]),
    imgUrl: new FormControl('')
  });


  get name(){
    return this.addingTripForms.get('name');
  }

  get country(){
    return this.addingTripForms.get('country')
  } 

  get startDate() {
    return this.addingTripForms.get('startDate')
  }

  get endDate() {
    return this.addingTripForms.get('endDate')
  }

  get cost() {
    return this.addingTripForms.get('cost')
  }

  get vacants() {
    return this.addingTripForms.get('vacants')
  }

  get info() {
    return this.addingTripForms.get('shortInfo')
  }

  checkDates(startDate: any, endDate: any){
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    console.log(startDate, endDate);
    if (startDate.getFullYear() <= endDate.getFullYear()){
      if (startDate.getFullYear() < endDate.getFullYear()){ return true; }
    
        if (startDate.getMonth() <= endDate.getMonth()) {
          if (startDate.getMonth() < endDate.getMonth()) { return true; }

            if (startDate.getDate() <= endDate.getDate()) {
              return true;
            } return false;
        } return false;
    } return false;
  }


  onSubmit(): void{
    if(this.addingTripForms.valid){
      
      if (this.checkDates(this.addingTripForms.get('startDate')!.value, this.addingTripForms.get('endDate')!.value)){
        this.isDateValid = true;
        let imageUrl = this.addingTripForms.get('imgUrl')!.value;

        if (imageUrl == ''){
          imageUrl = 'assets/images/defaultImage.jpg'
        }

        let trip = {
          name: this.addingTripForms.get('name')!.value,
          country: this.addingTripForms.get('country')!.value,
          startDate: this.addingTripForms.get('startDate')!.value,
          endDate: this.addingTripForms.get('endDate')!.value,
          cost: this.addingTripForms.get('cost')!.value,
          vacants: this.addingTripForms.get('vacants')!.value,
          info: this.addingTripForms.get('shortInfo')!.value,
          image: imageUrl,
          addedToCart: 0,
          rating: 0,
          bought: 0,
          id: this.trips.length
        } as unknown as Trip;

        this.db.addTrip(trip);
        this.addingTripForms.reset();

      }else{
        this.isDateValid = false;
      }
    }    
  }
}
