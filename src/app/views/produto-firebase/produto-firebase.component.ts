import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto-firebase',
  templateUrl: './produto-firebase.component.html',
  styleUrls: ['./produto-firebase.component.scss']
})
export class ProdutoFirebaseComponent implements OnInit {

  constructor(private router: Router,private http: HttpClient) { }

  

  ngOnInit(): void {

  }

}
