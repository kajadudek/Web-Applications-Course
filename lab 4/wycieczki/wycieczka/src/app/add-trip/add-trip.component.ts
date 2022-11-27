import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Output, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, AbstractControl} from '@angular/forms';
import { Validators } from '@angular/forms';
import { Trip, TripComponent } from '../trip/trip.component';


@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.css']
})

export class AddTripComponent {

  @Output() onSubmitSend = new EventEmitter<Trip>();

  addingTripForms = new FormGroup({
    name: new FormControl('', 
    [
      Validators.required,
      Validators.pattern("[A-Za-z \p{L}]+"),
      Validators.maxLength(25)
    ]),
    country: new FormControl('',
    [
      Validators.required,
      Validators.pattern("[A-Za-z \p{L}]+")
    ]),
    startDate: new FormControl('',
    [
      Validators.required,
      Validators.pattern("[0-9]{2}[\/]{1}[0-9]{2}[\/]{1}[0-9]{4}")
    ]),
    endDate: new FormControl('',
    [
      Validators.required,
      Validators.pattern("[0-9]{2}[\/]{1}[0-9]{2}[\/]{1}[0-9]{4}")
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

  // checkDates(startDate: any, endDate: any){
  //   startDate = startDate.value
  //   endDate = endDate.value
  //   if (Number(startDate.slice(6,10)) <= Number(endDate.slice(6,10))){
  //     if (Number(startDate.slice(6,10)) == Number(endDate.slice(6,10))){

  //       console.log('tu1: ' + startDate.slice(3,5),'?',console.log(endDate.slice(3,5)))
  //       if (Number(startDate.slice(3,5)) <= Number(endDate.slice(3,5))){
  //         console.log('juz w: ' + startDate.slice(3,5),'<=',console.log(endDate.slice(3,5)))
  //         if (Number(startDate.slice(3,5)) == Number(endDate.slice(3,5))) {

  //           if (Number(startDate.slice(0,3)) < Number(endDate.slice(0,3))){
  //             console.log('tutaaaj')
  //             return true;
  //           }
  //           return false;
  //         }
  //       }return true;
  //     }return false;
  //   }return true;
  // }

  onSubmit(): void{
    if(this.addingTripForms.valid){
      let trip = {
        name: this.addingTripForms.get('name')!.value,
        destinationCountry: this.addingTripForms.get('country')!.value,
        startDate: this.addingTripForms.get('startDate')!.value,
        endDate: this.addingTripForms.get('endDate')!.value,
        cost: this.addingTripForms.get('cost')!.value,
        vacants: this.addingTripForms.get('vacants')!.value,
        shortInfo: this.addingTripForms.get('shortInfo')!.value,
        imgUrl: this.addingTripForms.get('imgUrl')!.value,
        addedToCart: 0
      } as unknown as Trip;
      console.log(trip)
      this.onSubmitSend.emit(<Trip>trip);
      this.addingTripForms.reset();
    }    
  }
}
