import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServicedataService, Trip } from '../servicedata.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  tripsInCart!: Trip[];
  totalCost = 0;


  constructor(public servicedata: ServicedataService) {
  }

  ngOnInit(): void {
    this.tripsInCart = this.servicedata.trips;
    this.total();
  }

  @Input() howManyTrips!: number;
  @Input() currentCurrency!: string;
  @Input() currencyConvert!: number;

  @Output() deleteProduct: EventEmitter<Trip> = new EventEmitter();

  deleteProductFromCart(selectedTrip: Trip){
    this.deleteProduct.emit(selectedTrip);
    this.total();
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


}
