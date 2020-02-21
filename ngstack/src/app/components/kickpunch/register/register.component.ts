import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'src/app/components/common/toastr/toastr.service';
import { ToastrType, ToastrAlertType } from '../../../enums/toastr.enum';
import { LocalstorageType } from '../../../enums/localstorage.enum';
import { ICurrentUser, IResgisterReq } from '../../../models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerUserData: IResgisterReq = {email: "", name: "", password: ""};
  currentUser: ICurrentUser = {};

  constructor(private _auth: AuthService, private _router: Router, private _toastr: ToastrService) { }

  ngOnInit() {
  }

  // TODO: form validation

  registerUser() {
    this._auth.registerUser(this.registerUserData).subscribe(
      res => {
        localStorage.setItem(LocalstorageType.TOKEN, res.token);
        this._auth.updateCurrentUser(res.user);

        if(localStorage.getItem(LocalstorageType.CALLBACK)){
          this._router.navigate([localStorage.getItem(LocalstorageType.CALLBACK)]);
          localStorage.removeItem(LocalstorageType.CALLBACK);
        }
        else {
          this._router.navigate([`/${res.user.user_name}`]);
        }

        this._toastr.changeToastr(ToastrType.REGISTER_SUCCESS);

        // TODO: 사용법 모달창 띄우기
      },
      err => {
        if(err.status === 500) {
          this._toastr.changeToastr(ToastrType.REGISTER_FAIL_INTERNAL_SERVER);
        }
        else if(err.status === 401){
          this._toastr.changeToastr(ToastrType.REGISTER_FAIL_ALREADY_EXIST);
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
    )
  }

  // TODO: oauth는 어케함;;;
}
