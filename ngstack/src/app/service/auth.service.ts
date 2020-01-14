import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loginUrl = "http://localhost:3000/api/users/login";
  private _registerUrl = "http://localhost:3000/api/users/register";

  constructor(private _http: HttpClient, private _router:Router) { }

  registerUser(user): Observable<any> {
    return this._http.post<any>(this._registerUrl, user);
  }

  loginUser(user): Observable<any> {
    return this._http.post<any>(this._loginUrl, user)
  }

  loggedIn() {
    return !!localStorage.getItem('token') //!!를 쓰면 있는지 없는지 반환함
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/cocm1324']); // todo: 로그아웃 하던 페이지에 그냥 계속 있게 만들기
  }
}
