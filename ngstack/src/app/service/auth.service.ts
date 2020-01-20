import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loginUrl = "http://localhost:3000/api/login";
  private _registerUrl = "http://localhost:3000/api/register";
  private _newPostUrl = "http://localhost:3000/api/post"
  private _tokenGuardUrl = "http://localhost:3000/api/tokenguard"

  // current user data
  /**
   * in this app, jwt is used. since there is no store in backend, 
   * user data(except secret) is saved in localstorage.
   * this is to handle the user data
   */
  private currentUserSource = new BehaviorSubject<Data>({_id:null, name:null, email:null});
  get currentUser() {
    return this.currentUserSource.asObservable()
  }

  constructor(private _http: HttpClient, private _router:Router) { }

  registerUser(user): Observable<any> {
    return this._http.post<any>(this._registerUrl, user);
  }

  loginUser(user): Observable<any> {
    return this._http.post<any>(this._loginUrl, user);
  }

  newPost(post): Observable<any> {
    return this._http.post<any>(this._newPostUrl, post);
  }

  // 지금의 토큰과 파라미터의 유저네임이 같은지 확인하는 api
  tokenGuard(userName): Observable<any> {
    return this._http.get<any>(this._tokenGuardUrl + '/' +  userName);
  }

  loggedIn() {
    return !!localStorage.getItem('token'); //!!를 쓰면 있는지 없는지 반환함
  }

  getToken() {
    return localStorage.getItem('token');
  }

  updateCurrentUser(user: Data) {
    localStorage.setItem('current_user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('current_user');
    this.currentUserSource.next({_id:null, name:null, email:null});
    this._router.navigate([localStorage.getItem('callback')]);
    localStorage.removeItem('callback');
  }

}

class Data {
  _id: string;
  name: string;
  email: string;
}