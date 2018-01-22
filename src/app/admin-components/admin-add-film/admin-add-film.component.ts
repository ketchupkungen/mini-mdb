import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
import { GlobalService } from '../../services/global.service';


@Component({
  selector: 'app-admin-add-film',
  templateUrl: './admin-add-film.component.html',
  styleUrls: ['./admin-add-film.component.scss'],
  providers: [ RestService ]
})
export class AdminAddFilmComponent implements OnInit {


  filmid: number;
  occupationType: string;
  countries: any;
  lastPerson: number;

  constructor(
    private restservice: RestService,
    private globalservice: GlobalService) { }

  ngOnInit() {

  }

  addFilm(form: any) {

    form['changerId'] = this.globalservice.user.id;

    this.restservice.postVid('films', form).then(res => {
      console.log('posted', form);
    }, err => {
      console.log('Error occured.');
    });
  }
}
