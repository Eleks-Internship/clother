import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login-by-social-media',
  templateUrl: './login-by-social-media.component.html',
  styleUrls: ['./login-by-social-media.component.scss']
})
export class LoginBySocialMediaComponent implements OnInit {
  @ViewChild('loginRef', {static: true }) loginElement: ElementRef;

  constructor(
    private loginService: LoginService
  ) { }

  ngOnInit(): void {
    this.loginService.facebookLibrary();
    this.loginService.googleInitialize(this.loginElement.nativeElement);
  }

  getUserInfoByFacebook(): void {
    this.loginService.getUserInfoByFacebook();
  }

}
