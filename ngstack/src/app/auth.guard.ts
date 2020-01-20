import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './service/auth.service';
import { DataService } from './service/data.service';
import { map, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _auth: AuthService, private _router: Router, private _data: DataService) { }

  canActivate(route:ActivatedRouteSnapshot, ): Observable<boolean> {
    const user = route.params['user'];
    
    if(!user) {
      this._router.navigate(['/']);
      // TODO: toastr -> invalid request
      return of(false);
    }

    if(!this._auth.loggedIn()) {
      this._router.navigate(['/login']);
      // TODO: toastr -> not logged in
      return of(false);
    } 

    return this._auth.tokenGuard(user).pipe(
      map(response => response.message === 'ok'),
      catchError(error => {
        this._router.navigate(['/login']);
        return of(false);
      })
    );
  }
}

// I referenced this site when coding this file -> https://stackoverflow.com/questions/47210919/wait-for-http-inside-guard-on-angular-5/47211470 