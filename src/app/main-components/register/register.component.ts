import { Component, OnInit } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [
    RestService,
    Location, { provide: LocationStrategy, useClass: PathLocationStrategy }
  ]
})

export class RegisterComponent implements OnInit {

  credentials = {
    email: 'andy.murray@tennis.com',
    password: '123'
  };

  constructor(private restservice: RestService, private router: Router, private globalservice: GlobalService) { }

  ngOnInit() {
  }

  register() {

    setTimeout(() => { this.router.navigateByUrl('/login')}, 200);

    this.restservice.post('users', this.credentials).then(res => {
      this.globalservice.user = res.json().user;
      console.log('Hello from the REGISTER FUNCTION!: ', this.globalservice.user);
    });
  }

}
