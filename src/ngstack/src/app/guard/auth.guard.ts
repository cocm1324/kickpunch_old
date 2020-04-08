import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { DataService } from '../service/data/data.service';
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { SessionService } from '../service/session/session.service';
import { LocalstorageType } from '@enums/localstorage.enum';

@Injectable({
  	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(
		private router: Router, 
		private dataService: DataService,
		private sessionService: SessionService,
	) { }

	canActivate(route:ActivatedRouteSnapshot): Observable<boolean> {
		console.log
		const {userName} = route.params;

		if(!userName) {
			this.router.navigate(['/']);
			// TODO: toastr -> invalid request
			return of(false);
		}

		if(!this.sessionService.getIsLoggedIn) {
			this.router.navigate(['/login']);
			return of(false);
		} 

		return this.dataService.runVerifySession({userName: userName}).pipe(
			map(response => response.RESULT == 1),
			catchError(error => {
				this.router.navigate(['/login']);
				return of(false);
			})
		);
	}
}

// I referenced this site when coding this file -> https://stackoverflow.com/questions/47210919/wait-for-http-inside-guard-on-angular-5/47211470 