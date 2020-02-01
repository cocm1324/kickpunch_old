import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'src/app/components/common/toastr/toastr.service';
import { ToastrAlertType, ToastrType } from '../../../enums/toastr.enum';
import { LocalstorageType } from '../../../enums/localstorage.enum';
import { ICurrentUser, ILoginReq } from '../../../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginUserData: ILoginReq = {email:"", password:""};
  currentUser: ICurrentUser = {};

  constructor(private _auth: AuthService, private _router: Router, private _toastr: ToastrService) { }

  ngOnInit() {

  }

  // TODO: form validation
  loginUser() {
    this._auth.loginUser(this.loginUserData).subscribe(
      res => {
        localStorage.setItem(LocalstorageType.TOKEN, res.token);
        this._auth.updateCurrentUser(res.user);
        
        if(localStorage.getItem(LocalstorageType.CALLBACK)){
          this._router.navigate([localStorage.getItem(LocalstorageType.CALLBACK)]);
          localStorage.removeItem(LocalstorageType.CALLBACK);
        }
        else{
          this._router.navigate([`/${res.user.user_name}`]);
        }

        this._toastr.changeToastr(ToastrType.LOGIN_SUCCESS);
      },
      err => {
        if(err.status == 500){
          this._toastr.changeToastr(ToastrType.LOGIN_FAIL_INTERNAL_SERVER);
        }
        else if (err.status == 401){
          this._toastr.changeToastr(ToastrType.LOGIN_FAIL_IDPW_WRONG);
        }
        else {
          this._toastr.changeToastr({
            header: err.status + err.statusText,
            body: err.error,
            alert: ToastrAlertType.DANGER,
            timestamp: null
          });
        }
      }
    );
  }
}
