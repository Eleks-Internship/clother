import { Injectable } from '@angular/core';
import { Filter } from '../interface/filter';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  public static _filter: Filter;

  constructor() { }

  public set filter(info: Filter) {
    FilterService._filter = info;
  }

  public get filter() {
    return FilterService._filter;
  }
}
