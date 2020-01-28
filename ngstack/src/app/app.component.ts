import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { ToastrService, ToastrMessage } from './service/toastr.service';
import { ToastrComponent } from './common/toastr/toastr.component';
import { User } from 'src/assets/user';

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
    if(!localStorage.getItem('callback')){
      localStorage.setItem('callback', this._router.url);
    }
    else if(this._router.url != '/register'){
      localStorage.setItem('callback', this._router.url);
    }
    this._router.navigate(['/login']);
  }

  logout() {    
    localStorage.setItem('callback', this._router.url);
    
    this._auth.logoutUser();

    this._router.navigate([localStorage.getItem('callback')]);
    localStorage.removeItem('callback');

    // because logout doesn't activate guard, after logout current route keep displays 
    // even if the route is guarded.
    location.reload();

    this._toastr.changeToastr({
      header: `Goodbye`,
      body: "You are now signed out. Do come again ^^7",
      alert: "alert-warning"
    });
  }

  isLoggedIn() {
    return this._auth.loggedIn();
  }

  getCurrentUser() {
    this._auth.currentUser.subscribe(
      user => {
        if(user._id == null){
          if(localStorage.getItem('current_user') !== null){
            this.currentUser = JSON.parse(localStorage.getItem('current_user'));
            this._auth.updateCurrentUser(JSON.parse(localStorage.getItem('current_user')));
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
