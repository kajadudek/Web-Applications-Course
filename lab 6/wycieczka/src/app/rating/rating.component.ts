import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Trip } from '../services/servicedata.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input() height!: number;
  @Input() trip!: Trip;
  @Output() ratingSend: EventEmitter<number> = new EventEmitter();
  
  stars = [1, 2, 3, 4, 5];
  rating = 0;
  hoverStars = 0;

  ngOnInit(): void {
    this.rating = this.trip.rating;
  }

  enter(i: number) {
    this.hoverStars = i;
  }

  newRate() {
    this.hoverStars = 0;
  }

  updateRating(i: number) {
    this.rating = i;
    this.ratingSendToParent();
  }

  ratingSendToParent() {
    this.ratingSend.emit(this.rating);
  }
}
