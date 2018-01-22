import { Component, OnInit, OnDestroy } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { RestService } from '../../services/rest.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-list-all-actors',
  templateUrl: './list-all-actors.component.html',
  styleUrls: ['./list-all-actors.component.scss'],
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

export class ListAllActorsComponent implements OnInit, OnDestroy {
  mySqlData = [];
  desc = false;
  order = '';
  limit = 10;
  offset = 0;
  interval;

  constructor(private restservice: RestService) { }

  ngOnInit() {
   this.scrollToTop();
   this.setOrder('name');
   this.interval = setInterval(this.onScroll.bind(this), 500);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  onScroll() {
    let doc = $(document);

    let docHeight = doc.height();
    let scroll = Math.round(doc.scrollTop());
    let winHeight = $(window).height();

    if (docHeight - scroll <= winHeight * 1.5) {
      this.offset += this.limit;
      this.getListData();
    }
  }

  getListData() {
    let order = this.order;
    if (this.desc) {
      order += '&desc=1';
    }

    this.restservice.get('all_actors_list?limit=' + this.limit + '&offset=' + this.offset + '&order_by=' + order).then(data => {
      this.mySqlData = this.mySqlData.concat(data.json());
    }, err => {
      console.log('Error occured.');
    });
  }

  setOrder(order: string) {
    if (this.order == order) {
      this.desc = !this.desc;
    }
    this.order = order;
    this.offset = 0;
    this.mySqlData = [];
    // console.log('setting order:', this.order, 'is desc:', this.desc)
    this.getListData();
  }
}
