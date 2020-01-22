import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgxMdModule } from 'ngx-md';


import { DashboardComponent } from './dashboard/dashboard.component';
import { PostComponent } from './post/post.component';
import { NotfoundComponent } from './common/notfound/notfound.component';
import { LoginComponent } from './common/login/login.component';
import { EditorComponent } from './common/editor/editor.component';
import { NgxMdModule } from './common/ngxmd/ngx-md.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './common/register/register.component';
import { AuthService } from './service/auth.service';
import { DataService } from './service/data.service';
import { ManagerComponent } from './manager/manager.component';

// 폼에서 한글 마지막 글자 바인딩 안되는거 해결해주는 모듈
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { ToastrComponent } from './common/toastr/toastr.component';
import { ModifierComponent } from './common/modifier/modifier.component';

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
    ManagerComponent,
    ToastrComponent,
    ModifierComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgxMdModule.forRoot(),
    RouterModule.forRoot([]),
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    DataService,
    {
      provide: COMPOSITION_BUFFER_MODE,
      useValue: false
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
