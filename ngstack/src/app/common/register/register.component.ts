import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'src/app/service/toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerUserData = {email: "", name: "", password: ""};
  currentUser = {};

  constructor(private _auth: AuthService, private _router: Router, private _toastr: ToastrService) { }

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

        let message = {
          header: `Welcome to KickPunch!`,
          body: "Do post, and get a better tommorrow",
          alert: "alert-success"
        }
        this._toastr.changeToastr(message);

        // TODO: 사용법 모달창 띄우기
      },
      err => {
        if(err.status === 500) {
          let message = {
            header: `Ooopse, please try again later`,
            body: "Something went wrong back there",
            alert: "alert-danger"
          }
          this._toastr.changeToastr(message);
        }
        else if(err.status === 401){
          let message = {
            header: `User name already exists`,
            body: "Please try another email",
            alert: "alert-danger"
          }
          this._toastr.changeToastr(message);
        }
        else {
          let message = {
            header: err.status + err.statusText,
            body: err.error,
            alert: "alert-danger"
          }
          this._toastr.changeToastr(message);
        }
      }
    )
  }

  // TODO: oauth 연결하기
}
