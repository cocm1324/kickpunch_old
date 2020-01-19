import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { DataService } from './service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'ngstack';
  currentUser = {};

  constructor(private _router:Router, private _authService: AuthService) {}

  ngOnInit() {
    this._authService.getCurrentUser();
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
    this._authService.logoutUser();
  }
}
