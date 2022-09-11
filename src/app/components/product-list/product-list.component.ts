import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/Product";
import {
  PartialComponentLinkerVersion1
} from "@angular/compiler-cli/linker/src/file_linker/partial_linkers/partial_component_linker_1";
import {SMSServiceService} from "../../services/smsservice.service";
import {ShahkarReqJson} from "../../shahkar-req-json";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  comment?:String;
  products?: Product[];
  private fatemehShahkarReq: ShahkarReqJson=new ShahkarReqJson("0022236457","09924011072");

  constructor(private productService: ProductService,private smsServiceService:SMSServiceService) {
  }

  ngOnInit(): void {
    this.listProducts();
    this.showComment();
  }

  private listProducts(): void {
    this.productService.getProductList().subscribe(
      value => this.products = value
    );
  }
  private showComment():void{
    this.smsServiceService.getResponse(this.fatemehShahkarReq).subscribe(value => this.comment=value)

  }

}
