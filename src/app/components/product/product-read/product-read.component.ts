import { HeaderService } from './../../templates/header/header.service';
import { ProductService } from './../product.service';
import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-read',
  templateUrl: './product-read.component.html',
  styleUrls: ['./product-read.component.scss']
})
export class ProductReadComponent implements OnInit {

  products: Product[];
  displayedColumns = ['id', 'name', 'preco', 'acao'];

  constructor(private productService: ProductService,
    private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Produtos',
        icon: 'store',
        routeUrl: '/products'
      }
    }

  ngOnInit(): void {
    this.productService.read().subscribe(products => {
      this.products = products;
    })
  }

}
