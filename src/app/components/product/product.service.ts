import { Produtos } from './produto.model';
import { catchError, map } from 'rxjs/operators';
import { Product } from './product.model';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, EMPTY, Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/produtos";

  constructor(private snackBar: MatSnackBar,
    private http: HttpClient,
    private _angularFireDataBase: AngularFireDatabase) {}

  showMsg(msg: string, isError: boolean = true): void {
    this.snackBar.open(msg, '', {
      duration: 2000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msgSucess'] : ['msgError']
    })
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map(obj => obj),
      catchError( (e) => this.errorHandler(e))
    );
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map(obj => obj),
      catchError( (e) => this.errorHandler(e))
    );
  }

  readById(id: string): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      map(obj => obj),
      catchError( (e) => this.errorHandler(e))
    );
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(url, product).pipe(
      map(obj => obj),
      catchError( (e) => this.errorHandler(e))
    );
  }

  delete(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.delete<Product>(url).pipe(
      map(obj => obj),
      catchError( (e) => this.errorHandler(e))
    );
  }

  errorHandler(e: any): Observable<any> {
    console.log(e);
    if (e.status === 0 || e.status === 500) {
      this.showMsg('ERRO...Servior indisponível !!', e);
    } else if (e.status === 404) {
      this.showMsg('ERRO...Produto não encontrado !!', e);
    } else {
      this.showMsg('ERRO...Contate o Administrador !!', e);
    }   
    return EMPTY;
  }
}
