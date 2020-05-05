import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IUser } from '../../models';
import { LocalstorageType } from '../../enums/localstorage.enum';
import { environment } from 'src/environments/environment';

@Injectable({
  	providedIn: 'root'
})
export class SessionService {

	private currentUserSource = new BehaviorSubject<IUser>({
        id:null, 
        email:null, 
        userName:null, 
        created:null
    });

    get currentUser(): Observable<IUser> {
		return this.currentUserSource.asObservable();
	}

	constructor() { }

	getIsLoggedIn() {
		return !!localStorage.getItem(LocalstorageType.TOKEN); 
    }

	getToken() {
		return localStorage.getItem(LocalstorageType.TOKEN);
	}

	updateCurrentUser(user: IUser) {
		localStorage.setItem(LocalstorageType.CURRENT_USER, JSON.stringify(user));
		this.currentUserSource.next(user);
	}

	runLogOut() {
		localStorage.removeItem(LocalstorageType.TOKEN);
		localStorage.removeItem(LocalstorageType.CURRENT_USER);
		this.currentUserSource.next({
            id: null, 
            email: null, 
            userName: null, 
            created: null
        });
    }
}