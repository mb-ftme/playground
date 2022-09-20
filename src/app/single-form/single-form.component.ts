import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpHeaders} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../AuthService";
import {ChaparRQ} from "../models/chaparRQ";
import {map, Observable} from "rxjs";
import {chaparRES} from "../models/chaparRES";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-single-form',
  templateUrl: './single-form.component.html',
  styleUrls: ['./single-form.component.css']
})
export class SingleFormComponent  {

  filenames: string[] = [];
  fileStatus = {status: '', requestType: '', percent: 0};
  myhtmlValue!: String;
  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

  restForm = new FormGroup({
    message: new FormControl(''),
    nationalCode: new FormControl(''),
    fileSource: new FormControl('', [Validators.required])
  });
  private url: string = 'http://192.168.16.171:4558/api/v1/chapar/send-request';


  constructor(private http: HttpClient, private auth: AuthService) {

  }


  onSubmit() {
    // this.http.post(this.url, this.restForm.value).subscribe((data) => {
    //   console.warn(data);
    // });
    let sta = this.getResponse(<ChaparRQ> this.restForm.value).subscribe((data) => {
      console.log(data);
      console.log(sta);

      this.myhtmlValue = data.message_fa;
    });

  }

  getResponse(Ch: ChaparRQ): Observable<chaparRES> {
    return this.http.post<chaparRES>(this.url, Ch, this.httpOptions)



  }

  public onUploadFiles(files: File[]): void {

    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file, file.name);
    }
    this.auth.upload(formData).subscribe(
      event => {
        console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  private resportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      case HttpEventType.DownloadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Downloading... ');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          this.fileStatus.status = 'done';
          for (const filename of httpEvent.body) {
            this.filenames.unshift(filename);
          }
        } else {
          let fileName = httpEvent.headers.get('File-Name')!;
          saveAs(new File([httpEvent.body!], "fileName.csv",
            {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));

        }
        this.fileStatus.status = 'done';
        break;
      default:
        console.log(httpEvent);
        break;

    }
  }

  private updateStatus(loaded: number, total: number, requestType: string): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }

  onDownloadFile(): void {
    this.auth.download().subscribe(
      event => {
        console.log(event);
        this.resportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        alert(error)

      }
    );
  }

  load() {
    // console.log("///////////////////////////////////////////////")
    this.auth.load()
  }

}
