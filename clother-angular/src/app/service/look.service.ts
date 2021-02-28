import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Look } from '../interface/look';
import { environment } from 'src/environments/environment';
import { Clothes } from '../interface/clothes';

@Injectable({
  providedIn: 'root'
})
export class LookService {

  constructor(
    private http: HttpClient
  ) { }

  public create(info: { name: string, clothes: Clothes[] | { _id: string }[], user: { _id: string } }): Observable<Look | null> {
    return this.http.post<Look | null>(environment.urlForServer + '/api/v1/looks', info);
  }

  public get(): Observable<Look[]> {
    return this.http.get<Look[]>(environment.urlForServer + '/api/v1/looks');
  }

  public update(info: { id: string, name: string, clothes: Clothes[] | { _id: string }[] }): Observable<boolean> {
    return this.http.put<boolean>(environment.urlForServer + '/api/v1/looks', info);
  }

  public delete(info: { _id: string }): Observable<boolean> {
    return this.http.delete<boolean>(environment.urlForServer + '/api/v1/looks/' + info._id);
  }
}
