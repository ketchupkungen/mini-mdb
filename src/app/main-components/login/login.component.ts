import { Component } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    RestService,
    Location, { provide: LocationStrategy, useClass: PathLocationStrategy }
  ]
})

export class LoginComponent {
  statusMsg;

  credentials = {
    email: 'admin@mdb.com',
    password: 'amy123'
  }

  constructor(private restservice: RestService, private router: Router, private globalservice: GlobalService) {
    this.loginCheck();
  }

  loginCheck() {
    this.restservice.get('login').then(res => {
      this.globalservice.user = res.json().user;
    }, err => {
      console.log('loginCheck error: ');
    });
  }

  login() {
    this.restservice.post('login', this.credentials).then(res => {
      if (res.json().user) {
        this.router.navigateByUrl('/');
      }

      this.globalservice.user = res.json().user;
      this.statusMsg = res.json().status;

    }, err => {
      console.log('login error: ');
    });
  }

  logout() {
    this.globalservice.user = false;

    this.restservice.delete('login').then(res => {
      this.router.navigateByUrl('/');
    });
  }

}
