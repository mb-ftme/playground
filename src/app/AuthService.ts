import * as moment from "moment";
import {Injectable} from "@angular/core";
import {userRQ} from "./models/userRQ";
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {userRS} from "./models/userRS";
import {Observable, shareReplay} from "rxjs";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {

  }

  login(userName:string, password:string ) {

    let userRSObservable = this.http.post<userRS>('http://localhost:8080/api/v1/auth/login', {userName, password})
      .pipe(shareReplay());
    userRSObservable.subscribe(data=>{
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
    // return moment().isBefore(this.getExpiration());
    // if ( localStorage.getItem("id_token").includes(this.setSession())){

      return true;
     }



  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    // @ts-ignore
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }



  /////////////////////new upload
  // upload(file: File): Observable<HttpEvent<any>> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file);
  //   const req = new HttpRequest('POST', `'http://localhost:8080/api/v1/auth/login'`, formData, {
  //     reportProgress: true,
  //     responseType: 'json'
  //   });
  //
  //   return this.http.request(req);
  //
  //
  // }
}



