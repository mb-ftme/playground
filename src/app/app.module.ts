import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule, HttpRequest} from "@angular/common/http";

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FormListComponent } from './form-list/form-list.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import {AuthService} from "./AuthService";
import {AppRoutingModule} from "./AppRoutingModule";
import {Router, RouterModule} from "@angular/router";
import {AuthInterceptor} from "./auth.interceptor";
import { TestComponent } from './test/test.component';
import {GuardServiceGuard} from "./guard-service.guard";



@NgModule({
  declarations: [
    AppComponent,
    LoginComponentComponent,
    FormListComponent,
    TestComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,


  ],
//provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true
//   }
  providers: [AuthService,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},GuardServiceGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
