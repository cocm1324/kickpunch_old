import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { ToastrService, ToastrMessage } from 'src/app/service/toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginUserData = {};
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
      },
      err => {
        let message = new ToastrMessage();
        console.log(err)
        if(err.status == 500){
          message.header = "Internal Server Error";
          message.body = "Something went wrong back there";
          message.alert = "alert-danger";
          message.timestamp = new Date;
          this._toastr.changeToastr(message);
        }
        else if (err.status == 401){
          message.header = "Wrong Email or Password";
          message.body = "Please Check if your email or password";
          message.alert = "alert-danger";
          message.timestamp = new Date;
          this._toastr.changeToastr(message);
        }
      }
    );
  }
}
