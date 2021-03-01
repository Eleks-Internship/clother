import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import {TrendsComponent} from './pages/trends/trends.component';
import {LikelistComponent} from './pages/likelist/likelist.component';
import {RecommendationsComponent} from './pages/recommendations/recommendations.component';
import {MainpageComponent} from './pages/mainpage/mainpage.component';




const routes: Routes = [
  { path: '', canActivate: [ LoginGuard ], component: MainpageComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: 'trends', canActivate: [ LoginGuard ], component: TrendsComponent },
  { path: 'likelist', canActivate: [ LoginGuard ], component: LikelistComponent },
  { path: 'recommendations', canActivate: [ LoginGuard ], component: RecommendationsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
