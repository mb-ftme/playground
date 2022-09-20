import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import {AuthService} from "../AuthService";
import {userRQ} from "../models/userRQ";

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent  {
  // private url: string = 'http://192.168.16.171:4558/api/v1/auth/login'

  constructor(private auth:AuthService) { }

  form=new FormGroup({
    userName:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required])
  });



  get f(){
    return this.form;
  }
  onSubmit() {
    console.log("//////////////////////")
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    let userRQ1 = new userRQ(this.form.value.password!, this.form.value.userName!);
    this.auth.login(userRQ1).subscribe((res) => {
      console.log("nnnnnnnnnnnnnnnnnnnnnnnnnnn")
      console.log(userRQ1);
      console.log(res.token+"!!!!!!!!!!!!!!!!!!!!!")
      localStorage.setItem("id_token",res.token)
      console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeee")

    })


  }}
