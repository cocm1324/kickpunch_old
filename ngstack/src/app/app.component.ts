import { Component } from '@angular/core';
import { AuthService } from './service/auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from './components/common/toastr/toastr.service';
import { ToastrType } from './enums/toastr.enum'
import { LocalstorageType } from './enums/localstorage.enum';
import { RouterLinkType } from './enums/router-link.enum';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'ngstack';
  currentUser = {};

  constructor(private _router:Router, private _auth: AuthService, private _toastr:ToastrService) {}

  ngOnInit() {
    // TODO: this is causing error when login
    /**
     * when log in, login component save user data at local storage
     */
    this.getCurrentUser();
  }

  login() {
    if(!localStorage.getItem(LocalstorageType.CALLBACK)){
      localStorage.setItem(LocalstorageType.CALLBACK, this._router.url);
    }
    else if(this._router.url != '/' + RouterLinkType.REGISTER){
      localStorage.setItem(LocalstorageType.CALLBACK, this._router.url);
    }
    this._router.navigate(['/' + RouterLinkType.LOGIN]);
  }

  logout() {    
    localStorage.setItem(LocalstorageType.CALLBACK, this._router.url);
    
    this._auth.logoutUser();

    this._router.navigate([localStorage.getItem(LocalstorageType.CALLBACK)]);
    localStorage.removeItem(LocalstorageType.CALLBACK);

    // because logout doesn't activate guard, after logout current route keep displays 
    // even if the route is guarded.
    location.reload();

    this._toastr.changeToastr(ToastrType.LOGOUT);
  }

  isLoggedIn() {
    return this._auth.loggedIn();
  }

  getCurrentUser() {
    this._auth.currentUser.subscribe(
      user => {
        if(user._id == null){
          if(localStorage.getItem(LocalstorageType.CURRENT_USER) !== null){
            this.currentUser = JSON.parse(localStorage.getItem(LocalstorageType.CURRENT_USER));
            this._auth.updateCurrentUser(JSON.parse(localStorage.getItem(LocalstorageType.CURRENT_USER)));
          }
        }
        else {
          this.currentUser = user;
        }
      }
    );
  }

  goToRepo() {
    window.location.href = "https://github.com/cocm1324";
  }
}
