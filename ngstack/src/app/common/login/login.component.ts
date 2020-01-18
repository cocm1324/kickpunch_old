import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { GlobalDataService } from 'src/app/service/global-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginUserData = {};
  callbackUrl: string;

  constructor(private _auth: AuthService, private _router: Router, private _globalDataService: GlobalDataService) { }

  ngOnInit() {
    this.getCallbackURL();
  }

  getCallbackURL() {
    this._globalDataService.callbackURL.subscribe(url => this.callbackUrl = url);
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this._globalDataService.changeCurrentUserId(res.userId);
        this._router.navigate([this.callbackUrl]);
      },
      err => console.log(err) // TODO: 실패시 얼럿창 띄우기
    );
  }
}
