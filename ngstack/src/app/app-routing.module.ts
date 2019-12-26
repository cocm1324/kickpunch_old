import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostComponent } from './post/post.component';
import { NotfoundComponent } from './common/notfound/notfound.component';
import { LoginComponent } from './common/login/login.component';
import { PostlistComponent } from './postlist/postlist.component';
import { EditorComponent } from './common/editor/editor.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'notfound', component: NotfoundComponent },
  { path: ':user', component: DashboardComponent },
  { path: ':user/postlist', component: PostlistComponent },
  { path: ':user/new', component: EditorComponent },
  { path: ':user/:post', component: PostComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
