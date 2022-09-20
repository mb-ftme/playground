import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
 export const testurl = "http://localhost:8080/api/v1/test/";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let rq= request;
     (request.url===testurl)
       rq = request.clone({
        setHeaders: {
          Authorization: `${localStorage.getItem("id_token")}`
        }
      });

      //برای هندل کردن ریکوست ها پایپ میزاریم}
    return next.handle(rq).pipe(tap((value)=>{
      console.log(rq)

      console.log(value.type+"        "+",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,")
      console.log(",,,,,,,,,,,,,,,,,,,,,,,,,,,,,,")
      })
    );
  }
}
