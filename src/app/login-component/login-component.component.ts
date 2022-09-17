import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../AuthService";

@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  private url: string = 'http://localhost:8080/api/v1/auth/login'
  form!:FormGroup;
  constructor(private fb:FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.form = this.fb.group({
      userName: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  ngOnInit(): void {

  }

  login() {

    const val = this.form.value;
    if (val.userName && val.password) {
      this.authService.login(val.userName, val.password)
        .subscribe(
          value => {
            if ( value.token!=null) {
              this.router.navigate(['/form'])
            }else {
              localStorage.removeItem("id_token")
              localStorage.clear()
              localStorage.setItem("id_token","")
              this.router.navigate(['/login'])
            }

          }
        );

    }


    else {
      localStorage.clear()
      alert("همه فیلد ها پر شوند")
      this.router.navigate(['/login'])
    }


  }}
