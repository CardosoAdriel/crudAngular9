import { HeaderService } from './../../templates/header/header.service';
import { ProductService } from './../product.service';
import { Product } from './../product.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  prod: Product = {
    name: '',
    preco: null
  }
  formProdutos: FormGroup;

  constructor(private serviceProduct: ProductService,
    private router: Router,
    private formBuilder: FormBuilder,
    private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Novo Produto',
        icon: 'add_circle',
        routeUrl: '/products'
      }
    }

  ngOnInit(): void {
    this.formProdutos = this.formBuilder.group({
      formName: [null, Validators.compose([Validators.required])],
      formPreco: [null, Validators.compose([Validators.required])]
    });
  }



  create() { 
    this.serviceProduct.create(this.prod).subscribe( () => {
      this.serviceProduct.showMsg('Produto Cadastrado com Sucesso');
      this.router.navigate(['/products'])
    })
  }

  cancel() { 
    this.router.navigate(['/products'])
  }

}
