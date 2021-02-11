import { HeaderService } from './../../templates/header/header.service';
import { Product } from './../product.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss']
})
export class ProductDeleteComponent implements OnInit {

  prod: Product;
  name: string;
  preco: number;

  disableButton: boolean = false;

  constructor(private serviceProduct: ProductService, 
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService
    ) {
      headerService.headerData = {
        title: 'Excluir Produto',
        icon: 'delete',
        routeUrl: '/products'
      }
    }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.serviceProduct.readById(id).subscribe(product => {
      this.prod = product;

      this.name = this.prod.name;
      this.preco = this.prod.preco;
    });
  }

  deleteProduct(): void {
    this.prod.name = this.name;
    this.prod.preco = this.preco;
    this.disableButton = true;
    this.serviceProduct.delete(this.prod).subscribe( () => {
      this.serviceProduct.showMsg('Produto excluído com sucesso !');
      setTimeout(() => {
        this.router.navigate(['/products']);
      }, 1000);
    })
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

}
