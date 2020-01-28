import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostComponent } from './post/post.component';
import { NotfoundComponent } from './common/notfound/notfound.component';
import { LoginComponent } from './common/login/login.component';
import { EditorComponent } from './common/editor/editor.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './common/register/register.component';
import { ManagerComponent } from './manager/manager.component';
import { AuthGuard } from './auth.guard';
import { UpdatorComponent } from './common/updator/updator.component';

// TODO: 로그인을 한 유저가 login, register에 들어가지 못하도록 가드를 만들자

const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'notfound', component: NotfoundComponent },
  { path: ':user', component: DashboardComponent },
  { path: ':user/manager', component: ManagerComponent, canActivate: [AuthGuard] },
  { path: ':user/new', component: EditorComponent, canActivate: [AuthGuard] },
  { path: ':user/post/:post_id', component: PostComponent },
  { path: ':user/post/:post_id/edit', component: UpdatorComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})], // 같은 route로 navigate 할 때 reload함
  exports: [RouterModule]
})
export class AppRoutingModule { }
