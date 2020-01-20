import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from './service/toastr.service';
import { distinctUntilChanged, skip } from 'rxjs/operators';

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

    this._toastr.toastr$.pipe(
      distinctUntilChanged((prev, curr) => prev.timestamp === curr.timestamp),
      skip(1)
    ).subscribe(console.log); // TODO: change this part to show toaster
    // TODO: separeate toaster component from app component
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
}
