import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/kickpunch/dashboard/dashboard.component';
import { PostComponent } from './components/kickpunch/post/post.component';
import { NotfoundComponent } from './components/kickpunch/notfound/notfound.component';
import { LoginComponent } from './components/kickpunch/login/login.component';
import { EditorComponent } from './components/kickpunch/editor/editor.component';
import { LandingComponent } from './components/kickpunch/landing/landing.component';
import { RegisterComponent } from './components/kickpunch/register/register.component';
import { ManagerComponent } from './components/kickpunch/manager/manager.component';
import { AuthGuard } from './guard/auth.guard';
import { UpdatorComponent } from './components/kickpunch/updator/updator.component';

import { RouterLinkType } from '../app/enums/router-link.enum';
import { PageSmasherComponent } from './components/common/page-smasher/page-smasher.component';

// TODO: 로그인을 한 유저가 login, register에 들어가지 못하도록 가드를 만들자

const routes: Routes = [
  { path: '', component: LandingComponent},
  
  { path: RouterLinkType.TEST_PAGE, component: PageSmasherComponent },
  { path: RouterLinkType.NOTFOUND, component: NotfoundComponent },

  { path: RouterLinkType.LOGIN, component: LoginComponent },
  { path: RouterLinkType.REGISTER, component: RegisterComponent },
  
  { path: RouterLinkType.USER, component: DashboardComponent },
  { path: RouterLinkType.POST, component: PostComponent },
  { path: RouterLinkType.USER_MANAGER, component: ManagerComponent, canActivate: [AuthGuard] },
  { path: RouterLinkType.NEW_POST, component: EditorComponent, canActivate: [AuthGuard] },
  { path: RouterLinkType.MODIFTY_POST, component: UpdatorComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})], // 같은 route로 navigate 할 때 reload함
  exports: [RouterModule]
})
export class AppRoutingModule { }
