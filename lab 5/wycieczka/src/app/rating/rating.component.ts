import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent {

  @Input() height!: number;
  @Output() ratingSend: EventEmitter<number> = new EventEmitter();
  
  stars = [1, 2, 3, 4, 5];
  rating = 0;
  hoverStars = 0;

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
