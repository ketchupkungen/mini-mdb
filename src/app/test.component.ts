import { Component, OnInit } from '@angular/core';
import { RestService } from './services/rest.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  providers: [
    RestService
  ]
})

export class TestComponent implements OnInit {
  mySqlData: object[];
  filmgenre: any;
  title = 'My component!';

  editableText = 'myText';
  editablePassword = 'myPassword';
  editableTextArea = 'Text in text area';
  editableSelect = 2;
  editableSelectOptions = [
    { value: 1, text: this.filmgenre },
    { value: 2, text: 'admin' },
    { value: 3, text: 'banned' }
  ];

  constructor(private restservice: RestService) { }

  ngOnInit() {
    this.restservice.get('current_films').then(data => {
      this.onDbLoad(data);
    }, err => {
      console.log('Error occured.');
    });
  }

  onDbLoad(data) {
    const a = data.json();
    this.mySqlData = data.json();

    const b = a.map((r) => {
      this.filmgenre = r.genre;
      // console.log(r.genre);
    });

    // console.log(this.mySqlData, 'this.mySqlData');
  }

  saveEditable(value) {
    //call to http service
    console.log('http.service: ' + value);
  }
}
