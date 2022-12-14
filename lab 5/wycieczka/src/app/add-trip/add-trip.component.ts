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
  trips!: Trip[]

  constructor(public servicedata: ServicedataService,
    private dataService: DataService,
    private dbf: AngularFireDatabase,
    private db: FirebaseService) {
  }

  ngOnInit(): void {
    // this.trips = this.servicedata.trips;
    this.trips = this.db.getTrips();
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
      Validators.pattern("([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[\/]{1}[0-9]{2}[\/]{1}[0-9]{4}")
    ]),
    endDate: new FormControl('',
    [
      Validators.required,
      Validators.pattern("([0]{1}[1-9]{1}|[1-9]{1}[0-9]{1})[\/]{1}[0-9]{2}[\/]{1}[0-9]{4}")
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


  checkDates(startDate: any, endDate: any) {
    let year1 = Number(startDate.slice(6,10));
    let year2 = Number(endDate.slice(6,10));

    if (year1 <= year2){
      if (year1 == year2) {
        let month1 = Number(startDate.slice(3,5));
        let month2 = Number(endDate.slice(3,5));

        if (month1 <= month2) {
          if (month1 == month2) {
            let day1 = Number(startDate.slice(0,2));
            let day2 = Number(endDate.slice(0,2));

            if (day1 <= day2) {

              return true;
            }return false;
          }return true;
        } return false;
      }return true;
    }return false;
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
          id: this.trips.length + 1
        } as unknown as Trip;

        console.log(this.trips.length);
        this.dbf.list('Trips').push({
          id: this.trips.length + 1,
          name: trip.name,
          country: trip.country,
          startDate: trip.startDate,
          endDate: trip.endDate,
          cost: trip.cost,
          vacants: trip.vacants,
          info: trip.info,
          image: imageUrl,
          addedToCart: 0,
          rating: 0,
          bought: 0
        })

        this.trips.push(trip);
        this.addingTripForms.reset();

      }else{
        this.isDateValid = false;
      }
    }    
  }
}
