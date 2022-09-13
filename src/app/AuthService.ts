import * as moment from "moment";
import {Injectable} from "@angular/core";
import {userRQ} from "./models/userRQ";
import {HttpClient} from "@angular/common/http";
import {userRS} from "./models/userRS";
import {shareReplay} from "rxjs";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {

  }

  login(userName:string, password:string ) {

    let userRSObservable = this.http.post<userRS>('http://localhost:8080/api/v1/auth/login', {userName, password}).pipe(shareReplay());
    userRSObservable.subscribe(data=>{
      this.setSession(data)
    })
    return userRSObservable;


    // .do(res => this.setSession)
    // @ts-ignore
    // @ts-ignore
  }

  // @ts-ignore
  private setSession(authResult:userRS) {
    // const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', authResult.token);
    console.log(authResult.token)
    // localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    // @ts-ignore
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
