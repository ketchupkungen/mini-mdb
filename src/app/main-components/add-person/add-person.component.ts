import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss'],
  providers: [
    RestService,
    Location, { provide: LocationStrategy, useClass: PathLocationStrategy }
  ]
})

export class AddPersonComponent implements OnInit {
  filmid: number;
  occupationType: string;
  countries: any;
  lastPerson: number;

  constructor(private http: Http,
    private restservice: RestService,
    private router: Router,
    private location: Location,
    private globalservice: GlobalService) { }

  ngOnInit() {
    this.filmid = Number(this.location.path().slice(14));
    this.occupationType = this.location.path().slice(12, 13);
    this.loadCountries();
    this.checkMaxPersonId();
  }

  loadCountries() {
    this.http.get('http://localhost:3333/countries/').toPromise().then(data => {
      this.countries = data.json();
    }, err => {
      console.log('Error occured.');
    });
  }

  checkMaxPersonId() {
    this.restservice.get('persons').then(data => {
      const ppl = data.json();
      this.lastPerson = ppl[ppl.length - 1].id
    }, err => {
      console.log('director error');
    });
  }

  addPerson(form: any) {
    const personForm = form,
      relationForm = {};

    relationForm['filmId'] = this.filmid;
    relationForm['character'] = form.character;
    relationForm['changerId'] = this.globalservice.user.id;
    relationForm['isMainCharacter'] = form.isMainCharacter;

    personForm['changerId'] = this.globalservice.user.id;

    if (personForm.nationality === '') {
      delete personForm.nationality;
    }

    if (personForm.gender === '') {
      delete personForm.gender;
    }

    delete personForm.character;
    delete personForm.isMainCharacter;
    this.restservice.postVid('persons', personForm).then(res => {
      console.log('posted');
      this.relatePersonToFilmAs(relationForm);
    }, err => {
      console.log('Error occured.');
    });
  }

  relatePersonToFilmAs(relationForm: any) {

    let table;
    if (this.occupationType === 'a') {
      table = 'films_actors';
      relationForm['actorId'] = this.lastPerson + 1;
      relationForm.isMainCharacter = relationForm.isMainCharacter * 1;
    } else {
      table = 'films_directors';
      relationForm['directorId'] = this.lastPerson + 1;
      delete relationForm.isMainCharacter;
      delete relationForm.character;
    }

    console.log(table, relationForm);

    this.restservice.post(table, relationForm).then(res => {
      this.router.navigateByUrl('/film-page/' + this.filmid);
    }, err => {
      console.log('Error occured.');
    });
  }

}
