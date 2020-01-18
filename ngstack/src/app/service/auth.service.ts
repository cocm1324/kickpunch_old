import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loginUrl = "http://localhost:3000/api/login";
  private _registerUrl = "http://localhost:3000/api/register";
  private _currentUserUrl = "http://localhost:3000/api/user/currentUser";

  constructor(private _http: HttpClient, private _router:Router) { }

  registerUser(user): Observable<any> {
    return this._http.post<any>(this._registerUrl, user);
  }

  loginUser(user): Observable<any> {
    return this._http.post<any>(this._loginUrl, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token'); //!!를 쓰면 있는지 없는지 반환함
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('current_user'));
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('current_user');
    this._router.navigate([localStorage.getItem('callback')]);
    localStorage.removeItem('callback');
  }
}
