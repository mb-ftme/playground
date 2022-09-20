import {Injectable} from "@angular/core";
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {userRS} from "./models/userRS";
import {BehaviorSubject, Observable, shareReplay, tap} from "rxjs";
import {userRQ} from "./models/userRQ";


@Injectable({
  providedIn:"root"
})
export class AuthService {
   sever:string="http://192.168.16.171:4558";
   url: string = 'http://localhost:8080/api/v1/auth/login'


  public lg=new BehaviorSubject(false);
  constructor(public http:HttpClient) { }
  login(rq:userRQ){
    return this.http.post<userRS>('http://localhost:8080/api/v1/auth/login'
      ,rq)

  }

  // @ts-ignore
  private loadurl: string=`${this.sever}/load`;
  public setSession(authResult:userRS) {

    localStorage.setItem('id_token', authResult.token);
    console.log(authResult.token)

  }

  upload(formData: FormData): Observable<HttpEvent<string[]>> {
    return this.http.post<string[]>(`${this.sever}/resource/upload`, formData, {
      reportProgress: true,
      observe: 'events'
    });
  }
  download() {
   let filename="result.csv"
    return this.http.get(`${this.sever}/resource/download/${filename}/`, {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });

  }
  load(){
    console.log("///////////////////////////////////////////////")
    return this.http.get<any>("http://192.168.16.171:4558/load")
      .subscribe(value =>{ console.log(value)
        alert(value)
        },
          error => console.log(error))

  }


}



