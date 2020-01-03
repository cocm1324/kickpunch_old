import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginUserData = {};

  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData).subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

}
