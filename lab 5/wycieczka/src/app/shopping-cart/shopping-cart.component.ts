import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../data.service';
import { ServicedataService, Trip } from '../servicedata.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  tripsInCart!: Trip[];
  selectedTrip!: any;
  totalCost = 0;

  @Input() currentCurrency!: string;
  @Input() currencyConvert!: number;

  constructor(public servicedata: ServicedataService,
    private service: DataService) {
  }

  updateTotal(data: number) {
    this.service.updateTotal(data);
  }

  ngOnInit(): void {
    this.tripsInCart = this.servicedata.trips;
    this.total();
    this.updateTotal(this.totalCost);
  }

  @Input() howManyTrips!: number;

  @Output() deleteProduct: EventEmitter<Trip> = new EventEmitter();

  deleteProductFromCart(selectedTrip: Trip){
    this.deleteProduct.emit(selectedTrip);
    this.total();
    this.updateTotal(this.totalCost);
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
