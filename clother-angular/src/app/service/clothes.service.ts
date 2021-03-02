import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Clothes } from '../interface/clothes';

@Injectable({
  providedIn: 'root'
})
export class ClothesService {

  constructor(
    private http: HttpClient
  ) { }

  public create(info: { name: string, image: any, urlForBuy: string } | FormData): Observable<{ data: Clothes | null }> {
    return this.http.post<{ data: Clothes | null }>(environment.urlForServer + '/api/v1/clothes', info);
  }

  public get(info: { _id: string }): Observable<{ data: Clothes | null }> {
    return this.http.get<{ data: Clothes | null }>(environment.urlForServer + '/api/v1/clothes/' + info._id);
  }

  public getListForUser(info: { userId: string }): Observable<{ data: Clothes[] }> {
    return this.http.get<{ data: Clothes[] }>(environment.urlForServer + '/api/v1/users/' + info.userId + '/clothes');
  }

  public update(info: { id: string, name: string, image: any, urlForBuy: string } | FormData): Observable<{ data: boolean }> {
    return this.http.put<{ data: boolean }>(environment.urlForServer + '/api/v1/clothes', info);
  }

   public delete(info: { _id: string }): Observable<{ data: boolean }> {
     return this.http.delete<{ data: boolean }>(environment.urlForServer + '/api/v1/clothes/' + info._id);
   }
}
