import { Component, OnDestroy, OnInit } from '@angular/core';
import { Clothes } from 'src/app/interface/clothes';
import { Filter } from 'src/app/interface/filter';
import { User } from 'src/app/interface/user';
import { ClothesService } from 'src/app/service/clothes.service';
import { FilterService } from 'src/app/service/filter.service';
import { HttpService } from 'src/app/service/http.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit, OnDestroy {
  clothesList: Clothes[] = [];
  userId: string;
  isShowOfCreateClothes: boolean;

  filter: Filter | undefined;
  interval: any;

  constructor(
    private httpService: HttpService,
    private loginService: LoginService,
    private clothesService: ClothesService,
    private filterService: FilterService
  ) {
    this.isShowOfCreateClothes = false;
  }

  ngOnInit(): void {
    this.getUser();

    this.interval = setInterval(() => {
      if (this.filterService.filter !== undefined) {
        this.filter = this.filterService.filter;
        
        if (this.userId) {
          this.getClothesList({ userId: this.userId });
        }
      }
    }, 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  private getUser(): void {
    this.loginService.getUser().subscribe(
      res => {
        this.userId = res.data._id;
        this.getClothesList({ userId: res.data._id });
      },
      error => this.httpService.processingOfStatus(error.status)
    );
  }

  private getClothesList(info: { userId: string }): void {
    this.clothesService.getListForUser(info).subscribe(
      res => {
        this.clothesList = [];

        if (this.filter === undefined) {
          this.clothesList = res.data;
        } else {
          res.data.forEach(element => {
            if (this.filter[element.infoOfClothes[1].label]) {
              this.clothesList.push(element);
            }
          });
        }
      },
      error => this.httpService.processingOfStatus(error.status)
    );
  }

}
