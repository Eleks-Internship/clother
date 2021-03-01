import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService implements HttpInterceptor {

  constructor() { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req.clone({
      setHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }));
  }

  public processingOfStatus(errorStatus: number): void {
    console.log(errorStatus);
    switch (errorStatus) {
      case 400:
        alert('Ви не заповнили форму');
        break;
      case 401:
        alert('Ви не залогінилися в системі');
        break;
      case 500:
        alert('Виникла помилка на сервері');
        break;
      default:
        break;
    }
  }
}
