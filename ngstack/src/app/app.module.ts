import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMdModule } from 'ngx-md';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PostComponent } from './post/post.component';
import { PostlistComponent } from './postlist/postlist.component';
import { NotfoundComponent } from './common/notfound/notfound.component';
import { LoginComponent } from './common/login/login.component';
import { EditorComponent } from './common/editor/editor.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PostComponent,
    PostlistComponent,
    NotfoundComponent,
    LoginComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgxMdModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
