import { Component, OnInit,Output,EventEmitter } from '@angular/core';

import {HttpClient} from "@angular/common/http";

import {ShahkarReqJson} from "../shahkar/shahkar-req-json";

import {SMSServiceService} from "../services/smsservice.service";
import {FormControl} from "@angular/forms";
import {Form} from "../models/form";


@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})
export class FormListComponent implements OnInit {
  comment?:String;
  model=new Form("0034","0035");

  private fatemehShahkarReq: ShahkarReqJson=new ShahkarReqJson("0022236457","09924011072");
  // private dtaa!:FormControl;

  ngOnInit(): void {

    this.showComment();
 // this.onSubmit(this.dtaa);
 //
  }
  constructor(private http:HttpClient,private smsServiceService:SMSServiceService) {
  }

  private showComment():void{
    this.smsServiceService.getResponse(this.fatemehShahkarReq)
      .subscribe(value => this.comment=value)

  }



  // @ts-ignore
  onSubmit(data){
    this.http.post('http://localhost:5000',data)
      .subscribe((result)=>{
        console.warn("result",result);
      })

    console.warn(data);

  }









}
