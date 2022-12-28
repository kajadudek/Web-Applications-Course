import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { faTurkishLiraSign } from "@fortawesome/free-solid-svg-icons";
import { AuthService, User } from "src/app/services/auth.service";
import { FirebaseService } from "src/app/services/firebase.service";
import { Trip } from "src/app/services/servicedata.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})

export class StarComponent implements OnInit {
  starState = "star-not-clicked";
  user = new User('guest', 'guest', 'guest', 'guest', []);
  tripIsBought = false;
  tripRated = false;
  tripId: any;
  
  @Input() starId!: number;
  @Input() rating!: number;
  @Input() height!: number;
  @Input() trip!: Trip;

  @Output() chooseStars: EventEmitter<number> = new EventEmitter();
  @Output() enter: EventEmitter<number> = new EventEmitter();
  @Output() clicked: EventEmitter<number> = new EventEmitter();
  constructor(private auth: AuthService,
  private userService: UserService,
  private fb: FirebaseService) {}

  ngOnInit() {
    if (Math.round(this.rating) >= this.starId) {
      this.starState = "star-rated";
    }

    this.auth.userData.subscribe(user => {
      if (user != null){
        this.userService.users.subscribe(data => {
          this.user = data.filter((u: {id: string;}) => u.id == user.uid)[0];
          this.tripIsBought = false;
          this.tripRated  = false;
          for (let i of this.user.history){
            if (i.id == this.trip.id){
              this.tripId = i.boughtID;
              if (i.rated > 0){
                this.tripRated = true;
              }
              this.tripIsBought = true;
            }
          }
        })
      } else {
        this.user = new User('guest', 'guest', 'guest', 'guest', []);
      }
    })
  }

  onenter() {
    this.enter.emit(this.starId);
  }

  newRate() {
    this.chooseStars.emit(this.starId);
  }

  starClicked() {
    this.clicked.emit(this.starId);
    this.tripRated = true;
    this.fb.userRate(this.tripId, this.user, this.starId);
  }
}
