import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss'],
  providers: [
    RestService,
    Location, { provide: LocationStrategy, useClass: PathLocationStrategy }
  ]
})

export class UserPanelComponent implements OnInit {

  profileUpdated = false;

  userData = {};

  constructor(private restservice: RestService, private router: Router, private globalservice: GlobalService) {
    setTimeout(() => {
      // console.log(this.globalservice.user);

      this.userData = {
        firstName: this.globalservice.user.firstName,
        lastName: this.globalservice.user.lastName,
        phone: this.globalservice.user.phone,
        email: this.globalservice.user.email,
        password: this.globalservice.user.password,
      };


    }, '10');
  }

  ngOnInit() {
  }

  updateProfile() {

    this.profileUpdated = true;
    console.log('submitted: ', this.profileUpdated);

    this.restservice.put('users', this.userData, this.globalservice.user.id).then(res => {
      this.globalservice.user = res.json().user;
      console.log(res.json());
    });
  }

}
