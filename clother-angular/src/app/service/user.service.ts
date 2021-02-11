import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private httpService: HttpService
  ) { }

  create(info: { lastName: string, firstName: string, email: string, password: string }): void {
    this.http.post<{ data: string, message?: string }>(environment.urlForServer + '/api/v1/users', info).subscribe(
      res => {
        if (res.data) {
          localStorage.setItem('token', res.data);
          this.router.navigate(['']);
        }
      },
      error => this.httpService.processingOfStatus(error.status)
    );
  }
}
