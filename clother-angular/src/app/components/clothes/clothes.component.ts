import { Component, Input, OnInit } from '@angular/core';
import { Clothes } from 'src/app/interface/clothes';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.component.html',
  styleUrls: ['./clothes.component.scss']
})
export class ClothesComponent implements OnInit {
  @Input() clothes: Clothes;
  showClothesMode: boolean;

  urlForServer: string;

  constructor() { }

  ngOnInit(): void {
    this.showClothesMode = false;
    this.urlForServer = environment.urlForServer;
  }

  like(): void {

  }

}
