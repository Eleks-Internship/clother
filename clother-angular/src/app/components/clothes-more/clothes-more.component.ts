import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Clothes } from 'src/app/interface/clothes';
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

  constructor(
    private lookService: LookService
  ) { }

  ngOnInit(): void {
    this.urlForServer = environment.urlForServer;
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

  getRecommendationLookList(): void {
    this.lookService.getListRecommendations({ _id: this.clothes._id }).subscribe(
      res => {
        console.log(res.data);
      },
      error => console.log(error)
    );
  }

}
