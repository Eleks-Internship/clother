import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private router: Router,
    private http: HttpClient,
    private httpService: HttpService
  ) { }

  login(info: { email: string, password: string }): void {
    this.http.post<{ data: string, message?: string }>('/api/v1/login', info).subscribe(
      res => {
        if (res.data) {
          localStorage.setItem('token', res.data);
          this.router.navigate(['']);
        } else {
          alert('Пароль або логін невірний');
        }
      },
      error => this.httpService.processingOfStatus(error.status)
    );
  }
}
