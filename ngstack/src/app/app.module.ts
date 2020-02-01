import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardComponent } from './components/kickpunch/dashboard/dashboard.component';
import { PostComponent } from './components/kickpunch/post/post.component';
import { NotfoundComponent } from './components/kickpunch/notfound/notfound.component';
import { LoginComponent } from './components/kickpunch/login/login.component';
import { EditorComponent } from './components/kickpunch/editor/editor.component';
import { NgxMdModule } from './components/common/ngxmd/ngx-md.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LandingComponent } from './components/kickpunch/landing/landing.component';
import { RegisterComponent } from './components/kickpunch/register/register.component';
import { AuthService } from './service/auth/auth.service';
import { DataService } from './service/data/data.service';
import { ManagerComponent } from './components/kickpunch/manager/manager.component';

// 폼에서 한글 마지막 글자 바인딩 안되는거 해결해주는 모듈
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { AuthGuard } from './guard/auth.guard';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { ToastrComponent } from './components/common/toastr/toastr.component';
import { UpdatorComponent } from './components/kickpunch/updator/updator.component';

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
    UpdatorComponent
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
