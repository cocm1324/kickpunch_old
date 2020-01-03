import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgxMdModule } from 'ngx-md';


import { DashboardComponent } from './dashboard/dashboard.component';
import { PostComponent } from './post/post.component';
import { NotfoundComponent } from './common/notfound/notfound.component';
import { LoginComponent } from './common/login/login.component';
import { EditorComponent } from './common/editor/editor.component';
import { NgxMdModule } from './common/ngxmd/ngx-md.module';
import { HttpClientModule } from '@angular/common/http';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './common/register/register.component';
import { AuthService } from './service/auth.service';
import { DataService } from './service/data.service';
import { PostManagerComponent } from './post-manager/post-manager.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PostComponent,
    NotfoundComponent,
    LoginComponent,
    EditorComponent,
    LandingComponent,
    RegisterComponent,
    PostManagerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgxMdModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    AuthService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
