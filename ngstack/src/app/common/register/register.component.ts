import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { GlobalDataService } from 'src/app/service/global-data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerUserData = {};

  constructor(private _auth: AuthService, private _router: Router, private _globalDataService: GlobalDataService) { }

  ngOnInit() {
  }

  registerUser() {
    this._auth.registerUser(this.registerUserData).subscribe(
      res => {
        this._globalDataService.callbackURL.subscribe(url => {
          localStorage.setItem('token', res.token);
          this._router.navigate([url]);
        });
      },
      err => console.log(err)
    )
  }
}
