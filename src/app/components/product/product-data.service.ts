import { Produtos } from './produto.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  private produtoSource = new BehaviorSubject({ produto: null, key: '' });
  produtoAtual = this.produtoSource.asObservable();

  constructor() { }

  obtemProduto( produto: Produtos, key: string) {
    this.produtoSource.next({ produto: produto, key: key});
  }
}
