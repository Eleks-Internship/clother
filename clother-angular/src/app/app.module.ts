import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppComponent } from './app.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignUpFormComponent } from './components/sign-up-form/sign-up-form.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LoginBySocialMediaComponent } from './components/login-by-social-media/login-by-social-media.component';
import { HttpService } from './service/http.service';
import { NavigationComponent } from './components/navigation/navigation.component';
import { TrendsComponent } from './pages/trends/trends.component';
import { LookFormComponent } from './components/look-form/look-form.component';
import { LookbookComponent } from './components/lookbook/lookbook.component';
import { RecommendationsComponent } from './pages/recommendations/recommendations.component';
import { LikelistComponent } from './pages/likelist/likelist.component';
import { MainpageComponent } from './pages/mainpage/mainpage.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HeaderComponent,
    FooterComponent,
    SignUpFormComponent,
    LoginComponent,
    LoginFormComponent,
    LoginBySocialMediaComponent,
    NavigationComponent,
    TrendsComponent,
    LookFormComponent,
    LookbookComponent,
    RecommendationsComponent,
    LikelistComponent,
    MainpageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
