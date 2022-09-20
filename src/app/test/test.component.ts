import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {testurl} from "../auth.interceptor";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  x: any;


  constructor ( public http:HttpClient) { }

  ngOnInit(): void {
    this.http.get(testurl).subscribe(value =>{ this.x=value
      console.log(value)


      }


    )
    }



}
