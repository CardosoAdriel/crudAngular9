import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HeaderService } from './../../templates/header/header.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './../product.model';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {

  prod: Product;
  name: string;
  preco: number;

  formUpdate: FormGroup;

  constructor(private ProductService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private formBuilder: FormBuilder
    ) {
      headerService.headerData = {
        title: 'Atualizar Produtos',
        icon: 'edit',
        routeUrl: '/products'
      }
    }

  ngOnInit(): void {
    this.formUpdate = this.formBuilder.group({
      name: [null, Validators.compose([Validators.required])],
      preco: [null, Validators.compose([Validators.required])]
    });

    const id = this.route.snapshot.paramMap.get('id');
    this.ProductService.readById(id).subscribe(product => {
      this.prod = product;
      this.name = this.prod.name;
      this.preco = this.prod.preco;
    })
  }

  updateProduct(): void {
    this.prod.name = this.name;
    this.prod.preco = this.preco;
    this.ProductService.update(this.prod).subscribe( () => {
      this.ProductService.showMsg('Produto atualizado com sucesso ')      
      setTimeout(() => {
        this.router.navigate(['/products']);
      }, 1000);      
    })
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

}
