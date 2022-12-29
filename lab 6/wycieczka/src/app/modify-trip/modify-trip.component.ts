import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons'
import { FirebaseService } from '../services/firebase.service';
import { Trip, ServicedataService } from '../services/servicedata.service';

@Component({
  selector: 'app-modify-trip',
  templateUrl: './modify-trip.component.html',
  styleUrls: ['./modify-trip.component.css']
})
export class ModifyTripComponent implements OnInit {

  isDateValid = true;
  trips: Trip[] = [];
  tripName: any;
  tripNameError: boolean = false;
  trip: any;
  faTrashCan = faTrashCan;
  edited: any;
  prevEdited: any;

  constructor(public servicedata: ServicedataService,
    private db: FirebaseService) {
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
    trip: new FormControl('', 
    [
      Validators.required
    ]),
    name: new FormControl('', 
    [
      Validators.maxLength(20)
    ]),
    country: new FormControl('',
    [
      Validators.pattern("[A-Za-z \p{L}]+")
    ]),
    startDate: new FormControl(''),
    endDate: new FormControl(''),
    cost: new FormControl('',
    [
      Validators.pattern("[0-9]+([.]{1}[0-9]{2})?")
    ]),
    vacants: new FormControl('',
    [
      Validators.pattern("[0-9]+")
    ]),
    shortInfo: new FormControl('',
    [
      Validators.maxLength(255)
    ]),
    imgUrl: new FormControl('')
  });


  changeTripName(tripName: any){
    this.trip?.setValue(tripName.target.value, {
      onlySelf: true,
    });
    this.tripNameError = false;
  }

  get name(){
    return this.addingTripForms.get('name')
  }

  get country(){
    return this.addingTripForms.get('country')
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
      let selectedTrip = this.addingTripForms.get('trip')?.value as unknown as Trip;
      console.log(this.addingTripForms.get('trip')?.value);

      let name = this.addingTripForms.get('name')!.value || selectedTrip.name;
      let country =  this.addingTripForms.get('country')!.value || selectedTrip.country;
      let startDate = this.addingTripForms.get('startDate')!.value || selectedTrip.startDate;
      let endDate = this.addingTripForms.get('endDate')!.value || selectedTrip.endDate;
      let cost = this.addingTripForms.get('cost')!.value || selectedTrip.cost;
      let vacants = this.addingTripForms.get('vacants')!.value || selectedTrip.vacants;
      let info = this.addingTripForms.get('shortInfo')!.value || selectedTrip.info;
      let image = this.addingTripForms.get('imgUrl')!.value || selectedTrip.image;
      let images = selectedTrip.images;
      if (this.addingTripForms.get('imgUrl')!.value != '') {
        selectedTrip.images.push(this.addingTripForms.get('imgUrl')!.value as string);
        images = selectedTrip.images;
      }

      if (this.checkDates(startDate, endDate)){
        this.isDateValid = true;

        this.db.updateTrip(selectedTrip, name, country, startDate, endDate, cost, vacants, info, image, images);
        this.addingTripForms.reset();

      }else{
        this.isDateValid = false;
      }
    }    
  }

  deleteTrip(trip: Trip) {
    const id = this.trips.indexOf(trip,0);
    this.db.deleteTrip(trip);
    this.trips.splice(id,1);
  }

  changeEdited(trip: Trip){
    this.prevEdited = this.edited;
    if (this.edited == trip) {
      this.edited = null;
    } else {
      this.edited = trip;
    }
  }
}
