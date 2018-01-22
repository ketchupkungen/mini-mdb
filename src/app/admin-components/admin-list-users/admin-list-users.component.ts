import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-admin-list-users',
  templateUrl: './admin-list-users.component.html',
  styleUrls: ['./admin-list-users.component.scss'],
  providers: [
    RestService
  ]
})

export class AdminListUsersComponent implements OnInit {
  userData: any;

  constructor(private restservice: RestService, private globalservice: GlobalService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.restservice.get('users').then(res => {
      this.userData = res.json();
    }, err => {
      console.log('Error occured');
    });
  }

  warnUser(id: number, warnings: number) {
    let body = {};
    body['warnings'] = warnings + 1;

    this.restservice.put('users', body, id).then(res => {
      this.loadUsers();
    }, err => {
      console.log('hey');
    });
  }

}

// async findUserToBan() {
//   // CHECK IF THERE ARE USERS TO BAN & DELETE
//   let checkUsers = await this.query('SELECT * FROM users WHERE warnings = 3 && role != "banned"');

//   checkUsers.length != 0 ? this.deleteUserPosts(checkUsers) : console.log('Currently no users to ban');

//   if (checkUsers.constructor === Error) {
//     return;
//   }

//   this.next();
//   return;
// }
