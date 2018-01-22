import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable()
export class GlobalService {

  user: any;

  // _user: any;

  // constructor(private restservice: RestService) { }

  // get user() {
  //   if (!this._user) {
  //     (async () => {
  //       await this.restservice.get('login').then(res => {
  //         this._user = res.json().user
  //       });
  //     })();
  //   }

  //   return this._user;
  // }

  // set user(v) {
  //   this._user = v;
  // }

}