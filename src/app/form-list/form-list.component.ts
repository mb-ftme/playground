import { Component, OnInit,Output,EventEmitter } from '@angular/core';

import {HttpClient} from "@angular/common/http";

import {ShahkarReqJson} from "../shahkar/shahkar-req-json";

import {SMSServiceService} from "../services/smsservice.service";

import {ChaparRQ} from "../models/chaparRQ";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {
  form!: FormGroup;

  restForm=new FormGroup({
    message:new FormControl(''),
    nationalCode:new FormControl('')
  })
  firstName = new FormControl("", Validators.required);
   private url:string='http://localhost:8080/api/v1/chapar/insecure'
  // private shahkarUrl: string = "http://192.168.16.171:8080/shahkar-secondary-end-point";
  //
  //
  // private fatemehShahkarReq: ShahkarReqJson = new ShahkarReqJson("0022236457", "09924011072");



  ngOnInit(): void {

    // this.showComment();

  }

  constructor(private http: HttpClient, private smsServiceService: SMSServiceService
    , fb: FormBuilder) {
    // this.form = fb.group({
    //   "firstName": this.firstName,
    //   "password": ["", Validators.required]
    // });
  }

  // private showComment(): void {
  //   this.smsServiceService.getResponse(this.fatemehShahkarReq)
  //     .subscribe(value => this.comment = value)
  //
  // }




  // @ts-ignore
  // onSubmit(mm) {
  //   mm = this.form.value
  //   console.log(mm)
  //   this.smsServiceService.getResponse(mm)
  //     .subscribe((result) => {
  //       console.warn("result", result);
  //     })
  //
  // }

  onSubmit(){
    // console.warn(this.restForm.value)

    this.http.post(this.url,this.restForm.value).subscribe((data)=>{
      console.warn(data)
    })
  }


  //
  // @ts-ignore
  // onSubmit(mmm) {
  //   mmm=this.form.value
  //   this.http.post('http://localhost:5000', mmm)
  //     .subscribe((result) => {
  //       console.warn("result", result);
  //     })
  // }
  // console.warn(data);

}
