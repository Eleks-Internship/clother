import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClothesService } from 'src/app/service/clothes.service';
import { HttpService } from 'src/app/service/http.service';

@Component({
  selector: 'app-create-clothes',
  templateUrl: './create-clothes.component.html',
  styleUrls: ['./create-clothes.component.scss']
})
export class CreateClothesComponent implements OnInit {
  @Input() show: boolean;

  @Output() closed = new EventEmitter<boolean>();

  constructor(
    private httpService: HttpService,
    private clothesService: ClothesService
  ) { }

  ngOnInit(): void {
  }

  save(info: { name: string, image: any, urlForBuy: string } | FormData): void {
    this.clothesService.create(info).subscribe(
      res => {
        if (res.data) {
          alert('Clothes have been uploaded success');
          this.closed.emit(false);
        }
      },
      error => this.httpService.processingOfStatus(error.status)
    );
  }


}
