import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";

import {ShahkarReqJson} from "../shahkar/shahkar-req-json";
import {shahkarRes} from "../shahkar/shahkar-response";

@Injectable({
  providedIn: 'root'
})
export class SMSServiceService {
  private shahkarUrl: string = "http://192.168.16.171:8080/shahkar-secondary-end-point";
  constructor(private http:HttpClient) {

  }




   httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  };


  getResponse(shahkarReqJson: ShahkarReqJson): Observable<String> {
    let observable= this.http.post<shahkarRes>(this.shahkarUrl, ShahkarReqJson,this.httpOptions )
      .pipe(map(value =>value.data[0].comment));
  // console.log(observable)
    return observable;


  }
  // onSubmit(data){
  //   this.http.post(this.shahkarUrl,data)
  //     .subscribe((result)=>{
  //       console.warn("result",result);
  //     })






  }
interface shahkarResponseJson {

  "data": [
  {
    "requestNationalCode": "0022236457",
    "requestPhoneNumber": "09924011072",
    "raw": "{\"response\":200,\"requestId\":\"051520220911163933100000\",\"Id\":null,\"result\":\"OK.\",\"comment\":\"درخواست با موفقیت ثبت شد\"}",
    "response": 200,
    "requestId": "051520220911163933100000",
    "result": "OK.",
    "comment": "درخواست با موفقیت ثبت شد"
  }
],
  "errorCode": 0,
  "succeeded": true,
  "message": null,
  "modelState": null


}
