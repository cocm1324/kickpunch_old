import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'src/app/components/common/toastr/toastr.service';
import { ToastrType } from '../../../enums/toastr.enum';
import { LocalstorageType } from '../../../enums/localstorage.enum';
import { ILoginReq } from '../../../models';
import { DataService } from 'src/app/service/data/data.service';
import { SessionService } from 'src/app/service/session/session.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
	
	email: string = '';
	password: string = '';

	constructor(
		private router: Router, 
		private dataService: DataService,
		private sessionService: SessionService,
		private toastrService: ToastrService
	) { }

	ngOnInit() {

	}

	// TODO: form validation
	loginUser() {
		const request: ILoginReq = {
			email: this.email,
			password: this.password
		}

		this.dataService.runLogin(request).subscribe(res => {
			if (res.RESULT) {
				const {token, userInfo} = res.response;
				localStorage.setItem(LocalstorageType.TOKEN, token);
				this.sessionService.updateCurrentUser(userInfo);
				if(localStorage.getItem(LocalstorageType.CALLBACK)){
					this.router.navigate([localStorage.getItem(LocalstorageType.CALLBACK)]);
					localStorage.removeItem(LocalstorageType.CALLBACK);
				} else {
					this.router.navigate([`/${userInfo.userName}`]);
				}
				this.toastrService.changeToastr(ToastrType.LOGIN_SUCCESS);
			}
		});
	}
}
