import { HttpClient } from '@angular/common/http';
import { AngularFireDatabase } from '@angular/fire/database';
import { Contato } from './contato';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(private db: AngularFireDatabase, private http: HttpClient) { }

  insert(contato: Contato){
    this.db.list('contato').push(contato)
    .then( (result: any) => {
      console.log(result.key);
    });

  }

  update(contato: Contato, key: string) {
    this.db.list('contato').update(key, contato)
      .catch( (error: any) => {
        console.log(error);
      });
  }

  getId() {
    let dados = this.http.get("https://crudangular-a453b.firebaseio.com/contato.json?print=pretty");
    return dados;
  }

  getAll() {
    return this.db.list('contato')
      .snapshotChanges()
        .pipe(
          map( (changes: any) => {
            console.log('MEU RETORNO DO GetALL', changes);
            return changes.map(c => ({key: c.payload.key, ...c.payload.val() }))
          })
        );
  }

  delete(key: string) {
    this.db.object(`contato/${key}`).remove();
  }
}
