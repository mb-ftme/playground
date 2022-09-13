import {Component, OnInit, Output, EventEmitter} from '@angular/core';

import {HttpClient} from "@angular/common/http";

import {ShahkarReqJson} from "../shahkar/shahkar-req-json";

import {SMSServiceService} from "../services/smsservice.service";

import {ChaparRQ} from "../models/chaparRQ";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable} from "rxjs";
import {shahkarRes} from "../shahkar/shahkar-response";


@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {
  form!: FormGroup;

  restForm = new FormGroup({
    message: new FormControl(''),
    nationalCode: new FormControl('')
  })
  firstName = new FormControl("", Validators.required);
  private url: string = 'http://localhost:8080/api/v1/chapar/insecure'


  ngOnInit(): void {


  }

  constructor(private http: HttpClient, private smsServiceService: SMSServiceService
  ) {

  }


  onSubmit() {

     this.http.post(this.url, this.restForm.value).subscribe((data) => {
      console.warn(data)

    })
    // @ts-ignore
    console.log(seta)
  }
  getResponse(ReqJson: ShahkarReqJson): Observable<String> {
    let observable= this.http.post<shahkarRes>(this.shahkarUrl, ShahkarReqJson,this.httpOptions )
      .pipe(map(value =>value.data[0].comment));
    // console.log(observable)
    return observable;


}}
