import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestServiceProvider {
  data: any;

  constructor(public http: HttpClient) {
    console.log('Hello RestServiceProvider Provider');
  }

  load() {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    let opt: RequestOptions;
    let myHeaders: Headers = new Headers;

    myHeaders.set('Accept', 'application/json; charset=utf-8');
    myHeaders.append('Content-type', 'application/json; charset=utf-8');
    opt = new RequestOptions ({
      headers: myHeaders
    })

    return new Promise(resolve => {
      this.http.get('http://18.221.149.211/api/cocktails/', opt)
        .map(res => res.json())
        .subscribe(data => {
          this.data= data;
          resolve(this.data);
        });
    });
  }
}
