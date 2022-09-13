import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import {HttpClientModule} from "@angular/common/http";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FormListComponent } from './form-list/form-list.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import {AuthService} from "./AuthService";
import {AppRoutingModule} from "./AppRoutingModule";
import {Router, RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    FormListComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,


  ],

  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
