import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContatoDataService } from './../shared/contato-data.service';
import { ContatoService } from './../shared/contato.service';
import { Component, OnInit } from '@angular/core';
import { Contato } from '../shared/contato';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  contato: Contato;
  key: string;
  formContato: FormGroup;

  constructor(private contatoService: ContatoService, private contatoDataService: ContatoDataService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.contato = new Contato;

    this.contatoDataService.currentContato.subscribe( data => {
      if (data.contato && data.key) {
        this.contato = new Contato;
        this.contato.nome = data.contato.nome;
        this.contato.telefone = data.contato.telefone;
        this.key = data.key;
      }
    })

    this.formContato = this.fb.group({
      formContatoNome: [null, Validators.compose([Validators.required])],
      formContatoTelefone: [null, Validators.compose([Validators.required])]
    });   
  }

  onSubmit() {
    if(this.key) {
      this.contatoService.update(this.contato, this.key);
    } else {
      this.contatoService.insert(this.contato);
    }
    this.contato = new Contato;
    this.key = '';
  }

}
