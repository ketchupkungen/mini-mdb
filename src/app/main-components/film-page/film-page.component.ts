import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Http } from '@angular/http';
import { RestService } from '../../services/rest.service';
import { GlobalService } from '../../services/global.service';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { StarRatingComponent } from '../../reusable-components/star-rating/star-rating.component';
import { DomSanitizer } from '@angular/platform-browser';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-film-page',
  templateUrl: './film-page.component.html',
  styleUrls: ['./film-page.component.scss'],
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
    RestService,
    Location, { provide: LocationStrategy, useClass: PathLocationStrategy }
  ]
})

export class FilmPageComponent implements OnInit {
  closeResult: string;

  film: any = {};
  reviews: any;
  filmid: any;
  filmVersionId: any;
  reviewstatus = '';
  reviewForm = false;
  directorData: any;
  actorData: any;
  highlight = 'row align-items-center bg-secondary rounded';
  editableSelect: number;
  genreSelectOptions = [];
  allPersons: any;
  personsSelectOptions = [];
  editableSelect2: any;
  addDirectorForm: true;

  constructor(private http: Http,
    private restservice: RestService,
    private location: Location,
    private globalservice: GlobalService,
    private modalService: NgbModal) {
    this.film.imagePath = 'default.png';
  }

  ngOnInit() {
    this.scrollToTop();
    this.filmid = Number(this.location.path().slice(11));

    this.restservice.get('all_films_list', this.filmid).then(data => {
      this.film = data.json();
      this.loadGenres();
      this.filmVersionId = this.film.versionId;
    }, err => {
      console.log('Error occured.');
    });

    this.loadDirectors();
    this.loadActors();
    this.loadPersons();
    this.loadReviews();
  }

  scrollToTop() {
    window.scrollTo(0, 0);
  }

  loadDirectors() {
    this.restservice.get('person_as_director').then(data => {
      this.directorData = data.json().filter((res) => {
        return res.filmId === this.filmid;
      });
    }, err => {
      console.log('director error');
    });
  }

  loadActors() {
    this.restservice.get('film_roles').then(data => {
      this.actorData = data.json().filter((res) => {
        return res.filmId === this.filmid;
      });
    }, err => {
      console.log('actor error');
    });
  }

  loadPersons() {
    this.restservice.getVid('persons?order_by=firstName').then(data => {
      this.allPersons = data.json();
    }, err => {
      console.log('actor error');
    });
  }


  loadReviews() {
    this.restservice.get('all_reviews_list?order_by=timeCreated&desc=1&id=' + this.filmid).then(data => {
      this.reviews = data.json();
      if (this.reviews.length === 0) {
        this.reviewstatus = 'No reviews yet';
      }
    }, err => {
      console.log('Error occured.');
    });
  }

  loadGenres() {
    this.http.get('http://localhost:3000/genre/').toPromise().then(data => {
      const gs = data.json();
      this.genreSelectOptions = [];
      for (let i = 0; i < gs.length; i++) {
        this.genreSelectOptions.push({ value: i, text: gs[i] });
      }
      this.editableSelect = this.genreSelectOptions.findIndex((g) => {
        return g.text === this.film.genre
      });
    }, err => {
      console.log('Error occured.');
    });
  }

  submitReview(form: any): void {
    form.changerId = this.globalservice.user.id;
    form.filmId = this.filmid;

    // check if user already has posted
    const filteredReviews = this.reviews.filter((r) => {
      return r.userId === form.changerId;
    });

    if (filteredReviews.length !== 0) {

      this.restservice.put('reviews', form, filteredReviews[0].reviewId).then(res => {
        this.loadReviews();
      }, err => {
        console.log('Error occured.');
      });

    } else {
      this.restservice.post('reviews', form).then(res => {
        this.loadReviews();
      }, err => {
        console.log('Error occured.');
      });
    }

    this.scrollToTop();
  }

  submitPerson(form: any, occupation: string, table: string): void {

    form.changerId = this.globalservice.user.id;
    form.filmId = this.filmid;
    form.actorId = form.actorId * 1;
    form.isMainCharacter = form.isMainCharacter * 1;

    if (occupation === 'directorId') {
      delete form.actorId;
      delete form.isMainCharacter;
      form.directorId = form.directorId * 1;
    }

    this.restservice.post(table, form).then(res => {
      this.loadActors();
      this.loadDirectors();
    }, err => {
      console.log('Error occured.');
    });

  }

  saveEditable(value: any, table: string, colName: string) {


    const body = this.film;
    body[colName] = value;
    if (colName === 'genre') {
      body['genre'] = this.genreSelectOptions[value].text;
    }


    body['changerId'] = this.globalservice.user.id;

    delete body.id;
    delete body.avgRating;
    delete body.ratingCount;
    delete body.starring;
    delete body.directed;
    delete body.versionId;
    delete body.timeCreated;

    // call to http service
    this.restservice.postVid(table, body, this.filmid).then(res => {
    }, err => {
      console.log('Error occured.');
    });
  }

  updateCharacter(value: any, id: number, isMain: number) {
    const body = {}
      body['changerId'] = this.globalservice.user.id;
      body['character'] = value;
      body['filmId'] = this.filmid;
      body['actorId'] = id;
      body['isMainCharacter'] = isMain;

    console.log(body);
    this.restservice.post('films_actors', body).then(res => {
      console.log('posted');
    }, err => {
      console.log('Error occured.');
    });
  }

  removePerson(personId: number, occupation: string, table: string) {
    const query = table + '?' + occupation + '=' + personId + '&filmId' + '=' + this.filmid;

    this.restservice.delete(query).then(res => {
      this.loadActors();
      this.loadDirectors();
    }, err => {
      console.log('Error occured.');
    });
  }

  removeModal(d, a) {
    this.modalService.open(d, a).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
