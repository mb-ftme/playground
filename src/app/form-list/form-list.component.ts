import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {ChaparRQ} from "../models/chaparRQ";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {map, Observable} from "rxjs";
import {chaparRES} from "../models/chaparRES";
import {AuthService} from "../AuthService";

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.css']
})

export class FormListComponent implements OnInit {


  myhtmlValue!: String;
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  };
  restForm = new FormGroup({
    message: new FormControl(''),
    nationalCode: new FormControl(''),
    fileSource: new FormControl('', [Validators.required])
  })
  // firstName = new FormControl("", Validators.required);
  private url: string = 'http://localhost:8080/api/v1/chapar/insecure'

  ngOnInit(): void {

  }

  constructor(private http: HttpClient,private auth:AuthService) {

  }
  get f(){
    return this.restForm.controls;
  }

  onFileChange(event:any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.restForm.patchValue({
        fileSource: file
      });
    }
  }

  upload(){
    const formData = new FormData();
    //////////
    // @ts-ignore
    this.auth.getFile<any>().subscribe((data=> {

       alert('با موفقیت ثبت شد');
        console.log(data)

      } )


    )

    // @ts-ignore
    formData.append('file', this.restForm.get('fileSource')?.value);
    //عوض کردن//////////
    this.http.post(this.url, formData)
      .subscribe(res => {
        console.log(res);
        alert('با موفقیت ثبت شد');
      })
  }

  onSubmit() {
    this.http.post(this.url, this.restForm.value).subscribe((data) => {
      console.warn(data)
    })
    let sta = this.getResponse(<ChaparRQ>this.restForm.value).subscribe((data) => {
      console.log(sta)
      // @ts-ignore
      this.myhtmlValue = data;
    })
    // @ts-ignore
    console.log(seta)
  }

  getResponse(Ch: ChaparRQ): Observable<String> {
    return this.http.post<chaparRES>(this.url, Ch, this.httpOptions)
      .pipe(map(value => value.status));


  }
}
