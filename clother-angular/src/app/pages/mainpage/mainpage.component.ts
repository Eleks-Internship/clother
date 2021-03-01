import { Component, OnInit } from '@angular/core';
import { Clothes } from 'src/app/interface/clothes';
import { User } from 'src/app/interface/user';
import { ClothesService } from 'src/app/service/clothes.service';
import { HttpService } from 'src/app/service/http.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.scss']
})
export class MainpageComponent implements OnInit {
  clothesList: Clothes[] = [];

  constructor(
    private httpService: HttpService,
    private loginService: LoginService,
    private clothesService: ClothesService
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    this.loginService.getUser().subscribe(
      res => {
        this.getClothesList({ userId: res.data._id });
      },
      error => this.httpService.processingOfStatus(error.status)
    );
  }

  private getClothesList(info: { userId: string }): void {
    this.clothesService.getListForUser(info).subscribe(
      res => {
        this.clothesList = res.data;
      },
      error => this.httpService.processingOfStatus(error.status)
    );
  }

}
