import { Injectable } from '@angular/core';
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

  public getFilter(): string[] {
    const filterList: string[] = [];
    for (const [key, value] of Object.entries(FilterService.dataFilter)) {
      if (value) filterList.push(key);
    }
    return filterList;
  }
}
