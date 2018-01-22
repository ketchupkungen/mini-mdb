import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-statusbar',
  templateUrl: './statusbar.component.html',
  styleUrls: ['./statusbar.component.scss'],
  providers: [
    RestService
  ]
})

export class StatusbarComponent implements OnInit {

  constructor(private restservice: RestService, private globalservice: GlobalService) {
    this.loginCheck();
  }

  ngOnInit() {
  }

  loginCheck() {
    this.restservice.get('login').then(res => {
      this.globalservice.user = res.json().user;
    }, err => {
      console.log('loginCheck error: ');
    });
  }

}
