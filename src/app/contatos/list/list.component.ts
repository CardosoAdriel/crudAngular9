import { Observable } from 'rxjs';
import { ContatoDataService } from './../shared/contato-data.service';
import { ContatoService } from './../shared/contato.service';
import { Component, OnInit } from '@angular/core';
import { Contato } from '../shared/contato';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  contatos: Observable<any>;
  cid = {};
  displayedColumns = ['nome', 'telefone', 'acao'];

  constructor(private contatoService: ContatoService, private contatoDataService: ContatoDataService) { }

  ngOnInit(): void {
    this.contatos = this.contatoService.getAll();
    this.cid = this.contatoService.getId();
    console.log('id: ' + this.cid )
  }

  delete(key: string) { 
    this.contatoService.delete(key);
  }

  edit(nome: string, tel: string, key: string){
    let contato = {nome: nome, telefone: tel}
    this.contatoDataService.changeContato(contato, key);
  }
}
