import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from './components/common/toastr/toastr.service';
import { ToastrType } from './enums/toastr.enum'
import { LocalstorageType } from './enums/localstorage.enum';
import { RouterLinkType } from './enums/router-link.enum';
import { environment } from 'src/environments/environment';
import { SessionService } from './service/session/session.service';
import { DataService } from './service/data/data.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	title = 'ngstack';
	currentUser;

	get userName() {
		return this.currentUser.userName;
	}

	get isLoggedIn() {
		return this.sessionService.getIsLoggedIn();
	}

	constructor(
		private router:Router, 
		private sessionService: SessionService,
		private toastrService:ToastrService
	) {}

	ngOnInit() {
		// TODO: this is causing error when login
		/**
		 * when log in, login component save user data at local storage
		 */
		this.getCurrentUser();
	}

	login() {
		if(!localStorage.getItem(LocalstorageType.CALLBACK)){
			localStorage.setItem(LocalstorageType.CALLBACK, this.router.url);
		}
		else if(this.router.url != '/' + RouterLinkType.REGISTER){
			localStorage.setItem(LocalstorageType.CALLBACK, this.router.url);
		}
		this.router.navigate(['/' + RouterLinkType.LOGIN]);
	}

	logout() {    
		localStorage.setItem(LocalstorageType.CALLBACK, this.router.url);
		this.sessionService.runLogOut();
		this.router.navigate([localStorage.getItem(LocalstorageType.CALLBACK)]);
		localStorage.removeItem(LocalstorageType.CALLBACK);

		location.reload();
		this.toastrService.changeToastr(ToastrType.LOGOUT);
	}

	getCurrentUser() {
		this.sessionService.currentUser.subscribe(user => {
			if (user.id == null) {
				if (localStorage.getItem(LocalstorageType.CURRENT_USER) !== null) {
					this.currentUser = JSON.parse(localStorage.getItem(LocalstorageType.CURRENT_USER));
					this.sessionService.updateCurrentUser(JSON.parse(localStorage.getItem(LocalstorageType.CURRENT_USER)));
				}
			} else {
				this.currentUser = user;
			}
		});
	}

	goToBlog() {
		this.router.navigate([this.userName]);
	}

	goToManager() {
		this.router.navigate([`${this.userName}/manager`]);
	}

	goToEditor() {
		this.router.navigate([`${this.userName}/new`]);
	}

	goToRepo() {
		window.location.href = "https://github.com/cocm1324/kickpunch";
	}
}
