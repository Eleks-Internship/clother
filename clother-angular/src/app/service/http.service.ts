import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  public processingOfStatus(errorStatus): void {
    console.log(errorStatus);
    switch (errorStatus) {
      case 400:
        alert('Ви не заповнили форму');
        break;
      case 500:
        alert('Виникла помилка на сервері');
        break;
      default:
        break;
    }
  }
}
