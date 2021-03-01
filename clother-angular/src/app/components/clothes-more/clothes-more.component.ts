import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Clothes } from 'src/app/interface/clothes';

@Component({
  selector: 'app-clothes-more',
  templateUrl: './clothes-more.component.html',
  styleUrls: ['./clothes-more.component.scss']
})
export class ClothesMoreComponent implements OnInit {
  @Input() show: boolean;
  @Input() clothes: Clothes;

  @Output() closed = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  editClothes(): void {
    console.log("edit");
  }

  deleteClothes(): void {
    console.log('delete');
  }

  closedPopup(): void {
    this.show = false;
    this.closed.emit(false);
  }

}
