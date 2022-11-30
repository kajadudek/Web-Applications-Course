import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Trip } from '../trip/trip.component';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  totalCost = 0;

  @Input() tripsInCart!: Trip[];
  @Input() howManyTrips!: number;
  @Input() currentCurrency!: string;
  @Input() currencyConvert!: number;

  @Output() deleteProduct: EventEmitter<Trip> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.total();
  }

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
