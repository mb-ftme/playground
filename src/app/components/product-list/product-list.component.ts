import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {Product} from "../../models/Product";
import {
  PartialComponentLinkerVersion1
} from "@angular/compiler-cli/linker/src/file_linker/partial_linkers/partial_component_linker_1";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  products?: Product[];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.listProducts();
  }

  private listProducts(): void {
    this.productService.getProductList().subscribe(
      value => this.products = value
    );
  }

}
