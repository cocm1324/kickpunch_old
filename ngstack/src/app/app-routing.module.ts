import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostComponent } from './post/post.component';
import { NotfoundComponent } from './common/notfound/notfound.component';
import { LoginComponent } from './common/login/login.component';
import { EditorComponent } from './common/editor/editor.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './common/register/register.component';
import { PostManagerComponent } from './post-manager/post-manager.component';

const routes: Routes = [
  { path: '', component: LandingComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'notfound', component: NotfoundComponent },
  { path: ':user', component: DashboardComponent },
  { path: ':user/postmanager', component: PostManagerComponent },
  { path: ':user/new', component: EditorComponent },
  { path: ':user/:post', component: PostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
