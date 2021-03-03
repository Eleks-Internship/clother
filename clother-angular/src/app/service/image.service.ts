import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Image } from '../interface/image';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient
  ) { }

  public get(info: { _id: string }): Observable<{ data: Image | null }> {
    return this.http.get<{ data: Image | null }>(environment.urlForServer + '/api/v1/image/' + info._id);
  }
}
