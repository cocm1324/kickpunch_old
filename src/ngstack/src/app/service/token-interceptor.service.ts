import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { SessionService } from './session/session.service';

@Injectable({
  	providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

	constructor(
		private sessionService: SessionService
	) { }
	
	intercept(req, next) {
		const tokenizedReq = req.clone({
			setHeaders: {
				Authorization: `Bearer ${this.sessionService.getToken()}`
			}
		});
		return next.handle(tokenizedReq);
	}
}
