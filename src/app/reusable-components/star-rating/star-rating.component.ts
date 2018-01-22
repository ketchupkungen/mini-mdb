import { Component, Input } from '@angular/core';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  providers: [
    RestService
  ]
})

export class StarRatingComponent {

  @Input()
  set rating(r: number) {
    if (r !== undefined) {
      this.setRating(r);
    }
  }

  @Input()
  set id(i: number) {
    if (i !== undefined) {
      this.setId(i);
    }
  }

  private blackStars: number[] = [];
  private whiteStars: number[] = [];

  constructor(private restservice: RestService) {}

  setId(id: number) {
    this.restservice.get('ratings', id).then(data => {
      this.setRating(data.json().avgRating);
    }, err => {
      console.log('Error occured.', err);
    });
  }

  setRating(rating: number) {

    const maxStars = 5;
    rating = Math.round(Math.min(maxStars, rating));

    for (let i = 0; i < rating; ++i) {
      this.blackStars.push(i);
    }
    for (let i = 0; i < maxStars - rating; ++i) {
      this.whiteStars.push(i);
    }
  }

}
