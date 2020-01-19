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
        localStorage.setItem('current_user', JSON.stringify(res.user));
        this._router.navigate([localStorage.getItem('callback')]);
        localStorage.removeItem('callback');
      },
      err => {
        console.log(err)
        if(err.status == 500){
          this._toastr.changeToastr({
            header: "Something went wrong",
            body: "There was error in internal server",
            alert: "alert-danger"
          });
        }
        else {
          console.log(err) // TODO: 실패시 얼럿창 띄우기
        }
      }
    );
  }


}
