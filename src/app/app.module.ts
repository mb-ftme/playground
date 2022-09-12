import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import {HttpClientModule} from "@angular/common/http";
import {SMSServiceService} from "./services/smsservice.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FormListComponent } from './form-list/form-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FormListComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,



  ],
  // importing the product service to here so it can be injected
  providers: [SMSServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
