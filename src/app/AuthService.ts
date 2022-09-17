import * as moment from "moment";
import {Injectable} from "@angular/core";
import {userRQ} from "./models/userRQ";
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {userRS} from "./models/userRS";
import {Observable, shareReplay} from "rxjs";

@Injectable()
export class AuthService {
  url!:"";

  constructor(private http: HttpClient) {

  }

  login(userName:string, password:string ) {

    let userRSObservable = this.http.post<userRS>('http://localhost:4558/api/v1/auth/login', {userName, password},
      {
        headers:  new HttpHeaders({ 'No-Auth': 'True' })
      }
      )
      .pipe(shareReplay());
    userRSObservable.subscribe(data=>{
      console.log(data+"444444")
      this.setSession(data)
    })
    return userRSObservable;


    // .do(res => this.setSession)
    // @ts-ignore
    // @ts-ignore
  }

  // @ts-ignore
  public setSession(authResult:userRS) {
    // const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', authResult.token);
    console.log(authResult.token)
    //
  }



  public isLoggedIn() {
   return true;


  }


  getFile()
  {
    return this.http.get(this.url);

  }



  /////////////////////new upload
  // upload(file: File): Observable<HttpEvent<any>> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file);
  //   const req = new HttpRequest('POST', `'http://localhost:8080/api/v1/auth/login'`, formData, {
  //     reportProgress: true,
  //     responseType: 'json'
  //   });v
  //
  //   return this.http.request(req);
  //
  //
  // }
}



