import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../interface/user';
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

  public login(info: { email: string, password: string }): void {
    this.http.post<{ data: string, message?: string }>(environment.urlForServer + '/api/v1/login', info).subscribe(
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

  public getUser(): Observable<{ data: User | null }> {
    return this.http.get<{ data: User | null}>(environment.urlForServer + '/api/v1/login');
  }



  /* tslint:disable */
  public facebookLibrary(): void {
    (window as any).fbAsyncInit = function(): any {
      window['FB'].init({
        appId      : '456141478898375',
        cookie     : true,
        xfbml      : true,
        version    : 'v9.0'
      });

      window['FB'].AppEvents.logPageView();
    };

    (function(d: any, s: any, id: any): any {
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  public getUserInfoByFacebook(): void {
    window['FB'].login((response) => {
        console.log('login response',response);
        if (response.authResponse) {
 
          window['FB'].api('/me', {
            fields: 'last_name, first_name, email'
          }, (userInfo) => {
            this.loginByFacebook(userInfo);
          });
           
        } else {
          console.log('User login failed');
        }
    }, {scope: 'email'});
  }
  /* tslint:enable */

  private loginByFacebook(info: { lastName: string, firstName: string, email: string }): void {
    this.http.post<{ data: string, message?: string }>(environment.urlForServer + '/api/v1/login/facebook', info).subscribe(
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



  /* tslint:disable */
  public googleInitialize(nativeElement): void {
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        const auth2: any = window['gapi'].auth2.init({
          client_id: '62571873950-546mii4dhcojlrhm58eve4t5l8a7rq3d.apps.googleusercontent.com',
          cookie_policy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLogin(nativeElement, auth2);
      });
    }
    (function(d: any, s: any, id: any): any {
      let js: any, fjs: any = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }

  private prepareLogin(nativeElement, auth2): void {
    auth2.attachClickHandler(nativeElement, {},
      (googleUser: any) => {
        const profile: any = googleUser.getBasicProfile();
        this.loginByGoogle({ lastName: profile.getFamilyName(), firstName: profile.getGivenName(), email: profile.getEmail()});
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }
  /* tslint:enable */

  private loginByGoogle(info: { lastName: string, firstName: string, email: string }): void {
    this.http.post<{ data: string, message?: string }>(environment.urlForServer + '/api/v1/login/google', info).subscribe(
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
