import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService, User } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { FirebaseService } from '../services/firebase.service';
import { ServicedataService, Trip } from '../services/servicedata.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  tripsInCart: Trip[] = [];
  selectedTrip!: any;
  totalCost = 0;
  user = new User('guest', 'guest', 'guest', 'guest', [], []);

  @Input() currentCurrency!: string;
  @Input() currencyConvert!: number;

  constructor(public servicedata: ServicedataService,
    private service: DataService,
    private db: FirebaseService,
    private userService: UserService,
    private auth: AuthService) {
  }

  updateTotal(data: number) {
    this.service.updateTotal(data);
  }

  ngOnInit(): void {
    this.auth.userData.subscribe(user => {
      if (user != null){
        this.userService.users.subscribe(data => {
          this.user = data.filter((u: {id: string;}) => u.id == user.uid)[0];

          if (this.user.cart.length < 1) {
            for (let trip of this.user.cart){
              this.tripsInCart.push(trip as Trip);
            }
          }else {
            this.tripsInCart = [];
            for (let trip of this.user.cart){
              this.tripsInCart.push(trip as Trip);
            }
          }
          this.total();
        })
      } else {
        this.user = new User('guest', 'guest', 'guest', 'guest', [], []);
      }
    })
  }

  @Input() howManyTrips!: number;

  @Output() deleteProduct: EventEmitter<Trip> = new EventEmitter();

  deleteProductFromCart(selectedTrip: Trip){
    // this.deleteProduct.emit(selectedTrip);
    // this.db.removeFromCart(selectedTrip, 1)
    this.db.removeFromUserCart(this.user, selectedTrip, 0);
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
