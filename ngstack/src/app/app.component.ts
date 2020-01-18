import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { DataService } from './service/data.service';
import { GlobalDataService } from './service/global-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  title = 'ngstack';
  currentUserId;

  constructor(private _router:Router, private _authService: AuthService, private _globalDataService: GlobalDataService) {}

  ngOnInit() {
  }

  login() {
    if(this._router.url != '/register') this._globalDataService.changeCallbackURL(this._router.url);
    this._router.navigate(['/login']);
  }

  logout() {
    this._globalDataService.changeCallbackURL(this._router.url);
    this._authService.logoutUser();
  }
}
