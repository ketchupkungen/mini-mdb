import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { GlobalService } from '../../services/global.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-admin-all-activity',
  templateUrl: './admin-all-activity.component.html',
  styleUrls: ['./admin-all-activity.component.scss'],
  providers: [
    RestService
  ]
})

export class AdminAllActivityComponent implements OnInit {
  userData: any;
  userActivity = [];

  desc = true;
  order = '';
  limit = 10;
  offset = 0;
  interval;

  constructor(private restservice: RestService, private globalservice: GlobalService) { }

  async ngOnInit() {
    await this.loadUsers();

    this.setOrder('timeCreated');

    this.interval = setInterval(this.onScroll.bind(this), 500);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  onScroll() {
    let doc = $(document);

    let docHeight = doc.height();
    let scroll = Math.round(doc.scrollTop());
    let winHeight = $(window).height();

    if (docHeight - scroll <= winHeight * 1.5) {
      this.offset += this.limit;
      this.loadUserActivity();
    }
  }

  async loadUsers() {
    return this.restservice.get('users').then(res => {
      this.userData = res.json();
    }, err => {
      console.log('Error occured');
    });
  }

  async loadUserActivity() {
    let order = this.order;
    if (this.desc) {
      order += '&desc=1';
    }

    return this.restservice.get('admin_all_activity?limit=' + this.limit + '&offset=' + this.offset + '&order_by=' + order).then(res => {
      this.userActivity = this.userActivity.concat(res.json());
      this.userActivity.forEach(a=>{
        a.user = this.userData.find(u=>a.changerId == u.id);
      });
    }, err => {
      console.log('loadUserActivity error!');
    });
  }

  // getListData() {
  //   let order = this.order;
  //   if (this.desc) {
  //     order += '&desc=1';
  //   }

  //   this.restservice.get('all_directors_list?limit=' + this.limit + '&offset=' + this.offset + '&order_by=' + order).then(data => {
  //     this.mySqlData = this.mySqlData.concat(data.json());
  //   }, err => {
  //     console.log('Error occured.');
  //   });
  // }

  warnUser(changerId: number) {
    let body = {};

    let user = this.userData.filter((res) => {
      return res.id === changerId;
    });

    let userId = user[0].id;
    body['warnings'] = user[0].warnings + 1;

    console.log(user);
    console.log(userId);

    this.restservice.put('users', body, userId).then(res => {

      this.loadUsers();

    }, err => {
      console.log('hey');
    });
  }

  setOrder(order: string) {
    if (this.order == order) {
      this.desc = !this.desc;
    }
    this.order = order;
    this.offset = 0;
    this.userActivity = [];
    console.log('setting order:', this.order, 'is desc:', this.desc)
    this.loadUserActivity();
  }

}
