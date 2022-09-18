import * as moment from "moment";
import {Injectable} from "@angular/core";
import {userRQ} from "./models/userRQ";
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {userRS} from "./models/userRS";
import {Observable, shareReplay} from "rxjs";


@Injectable()
export class AuthService {

   sever:string="http://192.168.16.171:4558";
   url: string = 'http://192.168.16.171:4558/api/v1/auth/login'

  constructor(private http: HttpClient) {

  }

  login(userName:string, password:string ) {

    let userRSObservable = this.http.post<userRS>(this.url, {userName, password},
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
  private loadurl: string=`${this.sever}/load`;
  public setSession(authResult:userRS) {
    // const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', authResult.token);
    console.log(authResult.token)
    //
  }


  upload(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${this.sever}/resource/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
  download(filename: string): Observable<HttpEvent<Blob>> {
    return this.http.get(`${this.sever}/resource/download/${filename}/`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

  load():Observable<any>{
    console.log("///////////////////////////////////////////////")

    return this.http.get<any>("http://192.168.16.171:4558/load")

  }

}



