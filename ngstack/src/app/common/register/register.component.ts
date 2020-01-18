import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerUserData = {};
  currentUser = {};

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('current_user', JSON.stringify(res.user));
        this._router.navigate([localStorage.getItem('callback')]);
        localStorage.removeItem('callback');
      },
      err => console.log(err) // TODO: 실패시 얼럿창 띄우기
    )
  }
}
