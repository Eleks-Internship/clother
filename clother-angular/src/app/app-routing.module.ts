import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import {TrendsComponent} from './pages/trends/trends.component';
import {LikelistComponent} from './pages/likelist/likelist.component';
import {RecommendationsComponent} from './pages/recommendations/recommendations.component';
import {MainpageComponent} from './pages/mainpage/mainpage.component';
import {UserpageComponent} from './pages/userpage/userpage.component';
import {AppComponent} from './app.component';




const routes: Routes = [
  { path: '', component: MainpageComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'user-page', component: UserpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'trends', component: TrendsComponent },
  { path: 'likelist', component: LikelistComponent },
  { path: 'recommendations', component: RecommendationsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
