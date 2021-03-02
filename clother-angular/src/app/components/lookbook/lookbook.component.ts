import { Component, Input, OnInit } from '@angular/core';
import { Clothes } from 'src/app/interface/clothes';

@Component({
  selector: 'app-lookbook',
  templateUrl: './lookbook.component.html',
  styleUrls: ['./lookbook.component.scss']
})
export class LookbookComponent implements OnInit {
  @Input() clothesList: Clothes[];

  constructor() { }

  ngOnInit(): void {
  }

}
