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
	loginUserData: ILoginReq = { email:"", password:"" };

	email: string = '';
	password: string = '';

	constructor(
		private _auth: AuthService,
		private _router: Router, 
		private _toastr: ToastrService
	) { }

	ngOnInit() {

	}

	// TODO: form validation
	loginUser() {
		const request: ILoginReq = {
			email: this.email,
			password: this.password
		}

		this._auth.loginUser(request).subscribe(res => {
			if (res.RESULT) {
				const {token, user} = res.response;
				localStorage.setItem(LocalstorageType.TOKEN, token);
				this._auth.updateCurrentUser(user);
				
				if(localStorage.getItem(LocalstorageType.CALLBACK)){
					this._router.navigate([localStorage.getItem(LocalstorageType.CALLBACK)]);
					localStorage.removeItem(LocalstorageType.CALLBACK);
				}
				else{
					this._router.navigate([`/${user.user_name}`]);
				}

				this._toastr.changeToastr(ToastrType.LOGIN_SUCCESS);
			}
		});
	}
}
