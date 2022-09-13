import {Component, OnInit, Output, EventEmitter} from '@angular/core';

import {HttpClient, HttpHeaders} from "@angular/common/http";



import {SMSServiceService} from "../services/smsservice.service";

import {ChaparRQ} from "../models/chaparRQ";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable} from "rxjs";

import {chaparRES} from "../models/chaparRES";


@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {
  form!: FormGroup;
   // @ts-ignore
   myhtmlValue:String;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  };
  restForm = new FormGroup({
    message: new FormControl(''),
    nationalCode: new FormControl('')
  })
  firstName = new FormControl("", Validators.required);
  private url: string = 'http://localhost:8080/api/v1/chapar/insecure'


  ngOnInit(): void {

    // البته زمان اینیشالایز نباید سابسکرایب کرد
    // اینجا زمان فرستادن فرم باید سابسکراب کرد و متغییر رو پر کرد
    //الان من نفهمیدم
  }

  constructor(private http: HttpClient, private smsServiceService: SMSServiceService
  ) {

  }


  onSubmit() {

     this.http.post(this.url, this.restForm.value).subscribe((data) => {
      console.warn(data) })
    let sta = this.getResponse(<ChaparRQ>this.restForm.value).subscribe((data) => {
      console.log(sta)
      // @ts-ignore
      this.myhtmlValue = data;// نه مشکل تایپ و نوعش هست
      // String ?!= string
      //مرسی رییس حالا چ کنم
      // باید بیرون تعریف کنی تا جز فیلد های کلاس باشه
      //اینجوری یعنی؟
      // نه
      // ببین sta نوع دیتاش آبسروایبل هست
      // تو باید استرینگ رو بگیری که همون دیتا میشه
      // و خود استرینگ رو لاگ کمی یا پاس بدی به یک متغییر توی اچ تی ام ال



      // این ورودی میشه برای رکوعست بعد از پر شدن فرم و زدن دکمه سابمیت

    })
    // @ts-ignore
    console.log(seta)
  }
//ببین اینجا مشکل چیه
  getResponse(Ch:ChaparRQ): Observable<String> {
    // console.log('getres' + this.url + "******")
    // return this.http.get<chaparRES>(this.url)
    //این باید پست باشه؟بله
    return this.http.post<chaparRES>(this.url,Ch,this.httpOptions)//خوب ادامه بده
      .pipe(map(value => value.status));
    // خب الان چون تو فقط استاتوس رو از توی پایپ یا همون لوله رد میکنی تایپ خروجی که ریترن میشه
    // تغییر میکنه از  درسته الان
    // فقط باید به یک لوله یا آبسروایبل از نوع استرینگ سابسکرایب کنی
    // کجا ؟ زمانی که برنامه کامپوننت رو اینیشالایز میکنه
    // یعنی توی ng on init
    // اونجا باید گوش کرد و آماده دریافت مقدار استرینگ شد
    // وبه محض پر شدن اون رو به یک متغییر داد
    // تا توی اچ تی ام ال نشون بده
    // @ts-ignore
    //   let observable= this.http.post<chaparRES>(this.url, ChaparRQ,this.httpOptions )
    //     .pipe(map(value =>value.status));
    //   console.log(status)
    // return observable;


  }
}
