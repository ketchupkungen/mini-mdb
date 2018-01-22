import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { RestService } from '../../services/rest.service';
import { GlobalService } from '../../services/global.service';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.scss'],
  providers: [
    RestService
  ]
})

export class UploadPictureComponent {
  private filename: string;
  private _film: any;
  private _person: any;

  @ViewChild('uploadFile') fileInput: ElementRef;

  @Input() set film(v: any) {
    if (v !== undefined) {
      this._film = v;
    }
  }

  @Input() set person(v: any) {
    if (v !== undefined) {
      this._person = v;
    }
  }

  constructor(private http: Http, private restService: RestService, private globalService: GlobalService) { }

  showImageBrowseDlg() {
    const ev = new MouseEvent('click', {bubbles: true});
    this.fileInput.nativeElement.dispatchEvent(ev);
  }

  loadSelectedFile(fileUpload) {
    this.filename = fileUpload.files[0].name;

    const fr  = new FileReader();
    fr.onload = (e) => { this.sendToServer(e); };
    fr.readAsDataURL(fileUpload.files[0]);
  }

  async sendToServer(ev) {
    const imgData = ev.target.result;
    let table = 'persons';
    let id = 0;
    let postBody: any = {};

    if (this._person) {
      id = this._person.id;

      postBody = Object.assign({}, this._person);

    } else if (this._film) {
      table = 'films';
      id = this._film.id;

      postBody = Object.assign({}, this._film);
      delete postBody.avgRating;
      delete postBody.ratingCount;
      delete postBody.starring;
      delete postBody.directed;

    } else {
      console.log('error: no film or person given to upload-picture');
      return;
    }

    delete postBody.id;
    delete postBody.versionId;
    delete postBody.timeCreated;

    postBody.changerId = this.globalService.user.id;


    // Get current versionId
    let getResult: any = await this.restService.getVid(table, id);
    getResult = getResult.json();
    const vId = getResult.versionId + 1


    // Prepare the image filename
    const fileExtension = this.filename.substr(this.filename.lastIndexOf('.') + 1);
    postBody.imagePath = id + '_' + vId + '.' + fileExtension;
    const filename = table + '/' + postBody.imagePath;

    // POST the new imagePath
    await this.restService.postVid(table, postBody, id)
      .catch(e => console.log(e) );

    // Upload the picture
    const msgBody = {
      filename: filename,
      imgData: imgData
    };

    this.http.post('http://localhost:3000/upload-picture', { filename, imgData }).toPromise().then(data => {
      location.reload();
    }, err => {
        console.log('Error occured.', err);
    });
  }
}
