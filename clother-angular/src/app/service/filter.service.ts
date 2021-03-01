import { Injectable } from '@angular/core';
import { Clothes } from '../interface/clothes';
import { Filter } from '../interface/filter';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  public static dataFilter: Filter;

  constructor() { }

  public set filter(info: Filter) {
    FilterService.dataFilter = info;
  }

  public get filter(): Filter {
    return FilterService.dataFilter;
  }
}
