import { HeaderService } from './header.service';
import { Component, OnInit } from '@angular/core';
import { HeaderData } from './header.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  constructor(private headerService: HeaderService) { }

  ngOnInit(): void {
  }

  get infoTitle(): HeaderData {
    return this.headerService.headerData;
  }

}
