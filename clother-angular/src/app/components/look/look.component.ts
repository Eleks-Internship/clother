import { Component, Input, OnInit } from '@angular/core';
import { Clothes } from 'src/app/interface/clothes';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-look',
  templateUrl: './look.component.html',
  styleUrls: ['./look.component.scss']
})
export class LookComponent implements OnInit {
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
