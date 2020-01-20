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

  // TODO: form validation

  registerUser() {
    this._auth.registerUser(this.registerUserData).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this._auth.updateCurrentUser(res.user);
        this._router.navigate([localStorage.getItem('callback')]);
        localStorage.removeItem('callback');
        // TODO: 사용법 모달창 띄우기
      },
      err => console.log(err) // TODO: 실패시 얼럿창 띄우기
    )
  }

  // TODO: oauth 연결하기
}
