import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { Http } from '@angular/http';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss'],
  animations: [
    trigger('fadeIn-1', [
      state('in', style({ opacity: '1' })),
      transition('void => *', [
        style({ opacity: '0' }),
        animate('400ms 10ms ease-in')
      ])
    ]),
    trigger('fadeIn-2', [
      state('in', style({ opacity: '1' })),
      transition('void => *', [
        style({ opacity: '0' }),
        animate('400ms 10ms ease-in')
      ])
    ]),
    trigger('fadeIn-3', [
      state('in', style({ opacity: '1' })),
      transition('void => *', [
        style({ opacity: '0' }),
        animate('500ms 600ms ease-in')
      ])
    ])],
  providers: [
    RestService
  ]
})

export class FrontPageComponent implements OnInit {
  topfilms: object[];
  latestfilms: object[];
  news: object[];
  randomImage: string;

  constructor(private http: Http,
    private restservice: RestService) {
  }

  ngOnInit() {
    // Randomize front img
    this.randomImage = 'url(./assets/images/front-page/' + Math.floor(1 + Math.random() * 6) + '.png)'

    this.restservice.get('top10_highest?limit=5').then(data => {
      this.topfilms = data.json();
    }, err => {
      console.log('Error occured.');
    });

    this.restservice.get('current_films?limit=4&order_by=timeCreated&desc=1').then(data => {
      this.latestfilms = data.json();
    }, err => {
      console.log('Error occured.');
    });

    this.loadNews();
  }

  loadNews() {
    // Deployed
    this.http.get('/imdb-news').toPromise().then(data => {
    // Locally
    //this.http.get('http://localhost:3000/imdb-news').toPromise().then(data => {
      const arr = data.json();
      this.news = arr.slice(0, 2);
    }, err => {
      console.log('Error occured.');
    });
  }
}
