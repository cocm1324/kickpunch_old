import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'src/app/components/common/toastr/toastr.service';
import { ToastrType } from '../../../enums/toastr.enum';
import { LocalstorageType } from '../../../enums/localstorage.enum';
import { IRegisterReq, IUser } from '../../../models';
import { DataService } from 'src/app/service/data/data.service';
import { SessionService } from 'src/app/service/session/session.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
	registerUserData: IRegisterReq = {name: "", email: "", password: ""};
	currentUser: IUser = {};

	constructor(
		private router: Router,
		private dataService: DataService,
		private sessionService: SessionService,
		private toastrService: ToastrService,
	) { }

	ngOnInit() {
	}

	// TODO: form validation

  	registerUser() {
		this.dataService.runRegister(this.registerUserData).subscribe(res => {
			if(res.RESULT == 1){
				const {token, userInfo} = res.response
				localStorage.setItem(LocalstorageType.TOKEN, token);
				this.sessionService.updateCurrentUser(userInfo);
				if(localStorage.getItem(LocalstorageType.CALLBACK)){
					this.router.navigate([localStorage.getItem(LocalstorageType.CALLBACK)]);
					localStorage.removeItem(LocalstorageType.CALLBACK);
				}
				else {
					this.router.navigate([`/${userInfo.userName}`]);
				}
				this.toastrService.changeToastr(ToastrType.REGISTER_SUCCESS);
				// TODO: 사용법 모달창 띄우기
			}
		})
	}

  // TODO: oauth는 어케함;;;
}
