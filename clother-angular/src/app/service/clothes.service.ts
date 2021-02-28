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

  public create(info: { name: string, image: any, urlForBuy: string, user: { _id: string } }): Observable<Clothes | null> {
    return this.http.post<Clothes | null>(environment.urlForServer + '/api/v1/clothes', info);
  }

  public get(info: { _id: string }): Observable<Clothes | null> {
    return this.http.get<Clothes | null>(environment.urlForServer + '/api/v1/clothes/' + info._id);
  }

  public getListForUser(info: { userId: string }): Observable<Clothes[]> {
    return this.http.get<Clothes[]>(environment.urlForServer + '/api/v1/user/' + info.userId + '/clothes');
  }

  public update(info: { id: string, name: string, image: any, urlForBuy: string }): Observable<boolean> {
    return this.http.put<boolean>(environment.urlForServer + '/api/v1/clothes', info);
  }

   public delete(info: { _id: string }): Observable<boolean> {
     return this.http.delete<boolean>(environment.urlForServer + 'api/v1/clothes/' + info._id);
   }
}
