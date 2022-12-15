import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataService } from '../data.service';
import { FirebaseService } from '../firebase.service';
import { ServicedataService, Trip } from '../servicedata.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  tripsInCart: Trip[] = [];
  selectedTrip!: any;
  totalCost = 0;

  @Input() currentCurrency!: string;
  @Input() currencyConvert!: number;

  constructor(public servicedata: ServicedataService,
    private service: DataService,
    private db: FirebaseService) {
  }

  updateTotal(data: number) {
    this.service.updateTotal(data);
  }

  ngOnInit(): void {
    this.db.getTrips().subscribe(change => {
      if (this.tripsInCart == undefined || this.tripsInCart.length < 1) {
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

  @Input() howManyTrips!: number;

  @Output() deleteProduct: EventEmitter<Trip> = new EventEmitter();

  deleteProductFromCart(selectedTrip: Trip){
    // this.deleteProduct.emit(selectedTrip);
    this.db.removeFromCart(selectedTrip, 1)
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
