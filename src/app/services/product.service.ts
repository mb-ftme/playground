import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Product} from "../models/Product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private getProductsUrl: string = "http://localhost:8080/products";


  constructor(private httpclient: HttpClient /*this is the type just imported but injected elsewhere */) {

  }

  getProductList(): Observable<Product[]> {
    let observable = this.httpclient.get<GetResponse>(this.getProductsUrl).pipe(
      /*map is imported from rxjs/operators or automatically from rxjs */
      map(value => value._embedded.productEntities)
    );
    console.log(observable)
    return observable;
  }
}

interface GetResponse {
  _embedded: {
    productEntities: Product[];

  }
}
