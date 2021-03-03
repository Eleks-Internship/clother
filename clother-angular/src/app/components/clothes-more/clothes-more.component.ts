import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Clothes } from 'src/app/interface/clothes';
import { GeneratedLook } from 'src/app/interface/generated-look';
import { ClothesService } from 'src/app/service/clothes.service';
import { LookService } from 'src/app/service/look.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-clothes-more',
  templateUrl: './clothes-more.component.html',
  styleUrls: ['./clothes-more.component.scss']
})
export class ClothesMoreComponent implements OnInit {
  @Input() show: boolean;
  @Input() clothes: Clothes;

  @Output() closed = new EventEmitter<boolean>();

  urlForServer: string;
  showClothesMode: boolean;
  showGeneratedLook: boolean;

  generatedLook: GeneratedLook[];

  constructor(
    private clothesService: ClothesService,
    private lookService: LookService
  ) { }

  ngOnInit(): void {
    this.urlForServer = environment.urlForServer;
    this.showClothesMode = false;
    this.showGeneratedLook = false;
  }

  editClothes(): void {
    this.showClothesMode = true;
  }

  deleteClothes(): void {
    if (confirm("Видалити даний одяг")) {
      this.clothesService.delete({ _id: this.clothes._id }).subscribe(
        res => {
          if (res.data) {
            alert("Одяг було успішно видаленно");
            window.location.reload();
          }
        },
        error => console.error(error)
      );
    }
  }

  closedPopup(): void {
    this.show = false;
    this.closed.emit(false);
  }

  getRecommendationLookList(): void {
    this.lookService.getListRecommendations({ _id: this.clothes._id }).subscribe(
      res => {
        console.log(res.data);
        this.generatedLook = res.data;
        this.showGeneratedLook = true;
      },
      error => console.log(error)
    );
  }

}
