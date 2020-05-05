import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { BlogComponent } from './components/kickpunch/blog/blog.component';
import { PostComponent } from './components/kickpunch/post/post.component';
import { NotfoundComponent } from './components/kickpunch/notfound/notfound.component';
import { LoginComponent } from './components/kickpunch/login/login.component';
import { EditorComponent } from './components/kickpunch/editor/editor.component';
import { NgxMdModule } from './components/common/ngxmd/ngx-md.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LandingComponent } from './components/kickpunch/landing/landing.component';
import { RegisterComponent } from './components/kickpunch/register/register.component';
import { DataService } from './service/data/data.service';
import { ManagerComponent } from './components/kickpunch/manager/manager.component';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { AuthGuard } from './guard/auth.guard';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { ToastrComponent } from './components/common/toastr/toastr.component';
import { UpdatorComponent } from './components/kickpunch/updator/updator.component';
import { MdTextSummaryPipe } from './pipes/md-text-summary.pipe';
import { PipeModule } from './pipes/pipe.module';
import { PageSmasherModule } from './components/common/page-smasher/page-smasher.module';
import { AppCommonModule } from './app-common.module';
import { SessionService } from './service/session/session.service';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
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
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,

    AppCommonModule,
    AppRoutingModule,
    PageSmasherModule,
    PipeModule,

    NgxMdModule.forRoot()
  ],
  providers: [
    SessionService,
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
    },
    MdTextSummaryPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
