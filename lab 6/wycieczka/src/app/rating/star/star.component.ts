import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})

export class StarComponent implements OnInit {
  starState = "star-not-clicked";
  
  @Input() starId!: number;
  @Input() rating!: number;
  @Input() height!: number;

  @Output() chooseStars: EventEmitter<number> = new EventEmitter();
  @Output() enter: EventEmitter<number> = new EventEmitter();
  @Output() clicked: EventEmitter<number> = new EventEmitter();
  constructor() {}

  ngOnInit() {
    if (this.rating >= this.starId) {
      this.starState = "star-rated";
    }
  }

  onenter() {
    this.enter.emit(this.starId);
  }

  newRate() {
    this.chooseStars.emit(this.starId);
  }

  starClicked() {
    this.clicked.emit(this.starId);
  }
}
