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
  currentCurrency = "PLN";
  currencyConvert = 1;


  constructor(public servicedata: ServicedataService,
    private service: DataService) {
  }

  ngOnInit(): void {
    this.service.getCurrency().subscribe((data) => {
      this.currentCurrency = data as string;
    })

    this.service.getCurrencyConv().subscribe((data) => {
      this.currencyConvert = data as number;
    })

    this.tripsInCart = this.servicedata.trips;
    this.total();
  }

  @Input() howManyTrips!: number;

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
