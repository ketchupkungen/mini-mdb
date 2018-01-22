import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { RestService } from '../../services/rest.service';

@Component({
  selector: 'app-list-top-10',
  templateUrl: './list-top-10.component.html',
  styleUrls: ['./list-top-10.component.scss'],
  animations: [
    trigger('fadeIn-1', [
      state('in', style({opacity: '1'})),
      transition('void => *', [
        style({opacity: '0'}),
        animate('400ms 200ms ease-in')
      ])
    ]),
    trigger('fadeIn-2', [
      state('in', style({opacity: '1'})),
      transition('void => *', [
        style({opacity: '0'}),
        animate('100ms 120ms ease-in')
      ])
    ])],
  providers: [
    RestService
  ]
})

export class ListTop10Component implements OnInit {
  highestData: object[];
  lowestData: object[];

  constructor(private restservice: RestService) {
  }

  ngOnInit() {

    this.scrollToTop();

    this.restservice.get('top10_highest?limit=10&order_by=avgRating&desc=1').then(highestData => {
      this.highestData = highestData.json();
    }, err => {
        console.log('Error occured.');
    });

    this.restservice.get('top10_lowest?limit=10').then(lowestData => {
      this.lowestData = lowestData.json();
    }, err => {
        console.log('Error occured.');
    });

  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }
}
