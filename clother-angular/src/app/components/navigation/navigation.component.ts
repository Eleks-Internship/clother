import { Component, OnInit } from '@angular/core';
import { Filter } from 'src/app/interface/filter';
import { FilterService } from 'src/app/service/filter.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  filter: Filter;

  constructor(
    private filterService: FilterService
  ) { }

  ngOnInit(): void {
    this.filter = {
      bags: false,
      dresses: false,
      shoes: false,
      hats: false,
      coats: false,
      pants: false,
      shorts: false,
      skirts: false,
      t_shirts: false,
      sweaters: false,
      raincoats: false
    };
  }

  sendFilter(): void {
    this.filterService.filter = this.filter;
  }

}
