import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Clothes } from 'src/app/interface/clothes';
import { ClothesService } from 'src/app/service/clothes.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-edit-clothes',
  templateUrl: './edit-clothes.component.html',
  styleUrls: ['./edit-clothes.component.scss']
})
export class EditClothesComponent implements OnInit {
  @Input() show: boolean;
  @Input() clothes: Clothes;

  @Output() closed = new EventEmitter<boolean>();

  constructor(
    private httpService: HttpService,
    private clothesService: ClothesService
  ) { }

  ngOnInit(): void {
  }

  edit(info: { id: string, name: string, image: any, urlForBuy: string } | FormData): void {
    this.clothesService.update(info).subscribe(
      res => {
        if (res.data) {
          alert('Clothes have been updated success');
          this.closed.emit(false);
          window.location.reload();
        }
      },
      error => this.httpService.processingOfStatus(error.status)
    );
  }

}
