import { Component } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent {
  actors = [];
  directors = [];
  films = [];
  hasResults = false;
  hidden = true;
  shouldHide = false;

  constructor(private http: Http) { }

  onKey(e) { this.performSearch(e.target.value); }
  onBlur() {
    this.shouldHide = true;
    setTimeout(() => {
      this.hidden = this.shouldHide;
      this.shouldHide = false;
    }, 10);
  }

  onFocus() {
    setTimeout(() => {
      this.hidden = this.shouldHide = false;
    }, 1);
  }

  performSearch(searchWord: string) {
    if (!searchWord) {
      this.hasResults = false;
      return;
    }
    this.http.get('http://localhost:3333/search/' + searchWord).toPromise().then(data => {
    //this.http.get('http://localhost:3000/search/' + searchWord).toPromise().then(data => {
      const sr = data.json();
      Object.assign(this, sr);

      this.hidden = false;
      this.hasResults = sr.actors.length || sr.directors.length || sr.films.length;
    }, err => {
        console.log('Error occured.');
    });
  }
}
