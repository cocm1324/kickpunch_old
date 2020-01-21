import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'src/app/service/toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginUserData = {email:"", password:""};
  currentUser = {};

  constructor(private _auth: AuthService, private _router: Router, private _toastr: ToastrService) { }

  ngOnInit() {

  }

  // TODO: form validation
  loginUser() {
    this._auth.loginUser(this.loginUserData).subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this._auth.updateCurrentUser(res.user);
        this._router.navigate([localStorage.getItem('callback')]);
        localStorage.removeItem('callback');

        let message = {
          header: `Hello ${res.user.name}`,
          body: "Welcome back ^^7",
          alert: "alert-success"
        }
        this._toastr.changeToastr(message);
      },
      err => {
        if(err.status == 500){
          let message = {
            header: "Internal Server Error",
            body: "Something went wrong back there",
            alert: "alert-danger"
          }
          this._toastr.changeToastr(message);
        }
        else if (err.status == 401){
          let message = {
            header: "Wrong Email or Password",
            body: "Please Check if your email or password",
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
    );
  }
}
