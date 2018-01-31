import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RestService {

  // Only expect https in live mode where the res url then will be set differently
  private url = location.protocol == 'https:' ? '/rest/' : 'http://localhost:3333/';

  // On server
  //private url = "/";



  constructor(private http: Http) { }

  private buildUrl(tableName: string, id?: number) {
    return this.url + 'rest/' + tableName + (id ? '/' + id : '');
  }

  private buildUrlVid(tableName: string, id?: number) {
    return this.url + 'vid/' + tableName + (id ? '/' + id : '');
  }

  get(tableName: string, id?: number) {
    return this.http.get(this.buildUrl(tableName, id), { withCredentials: true }).toPromise();
  }

  getVid(tableName: string, id?: number) {
    return this.http.get(this.buildUrlVid(tableName, id), { withCredentials: true }).toPromise();
  }

  post(tableName: string, body: object, id?: number) {
    return this.http.post(this.buildUrl(tableName, id), body, { withCredentials: true }).toPromise();
  }

  postVid(tableName: string, body: object, id?: number) {
    return this.http.post(this.buildUrlVid(tableName, id), body, { withCredentials: true }).toPromise();
  }

  put(tableName: string, body: object, id?: number) {
    return this.http.put(this.buildUrl(tableName, id), body, { withCredentials: true }).toPromise();
  }

  delete(tableName: string, id?: number) {
    return this.http.delete(this.buildUrl(tableName, id), { withCredentials: true }).toPromise();
  }

}
