import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {HttpClientModule} from "@angular/common/http";
import {ProductService} from "./services/product.service";
import {SMSServiceService} from "./services/smsservice.service";

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  // importing the product service to here so it can be injected
  providers: [ProductService,SMSServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
