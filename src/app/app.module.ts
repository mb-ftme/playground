import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import {HttpClientModule} from "@angular/common/http";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FormListComponent } from './form-list/form-list.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import {AuthService} from "./AuthService";

@NgModule({
  declarations: [
    AppComponent,
    FormListComponent,
    LoginComponentComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,



  ],

  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
