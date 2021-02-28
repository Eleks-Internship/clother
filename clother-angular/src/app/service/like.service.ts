import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LikeForLook } from '../interface/like-for-look';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(
    private http: HttpClient
  ) { }

  public create(info: { look: { _id: string } }): Observable<LikeForLook | null> {
    return this.http.post<LikeForLook | null>(environment.urlForServer + '/api/v1/looks/' + info.look._id + '/like', {});
  }

  public getListByUser(): Observable<LikeForLook[]> {
    return this.http.get<LikeForLook[]>(environment.urlForServer + '/api/v1/like');
  }

  public getListByLook(info: { look: { _id: string } }): Observable<LikeForLook[]> {
    return this.http.get<LikeForLook[]>(environment.urlForServer + '/api/v1/looks/ ' + info.look._id + '/like');
  }

  public delete(info: { _id: string }): Observable<boolean> {
    return this.http.delete<boolean>(environment.urlForServer + '/api/v1/like/' + info._id);
  }
}
