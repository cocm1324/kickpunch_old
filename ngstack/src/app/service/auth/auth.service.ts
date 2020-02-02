import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { ICurrentUser, IPostUpdateReq, IPostCreateReq, IPostCreateRes, IPostDeleteRes, IPostDeleteReq } from '../../models';
import { EndpointType } from '../../enums/endpoint.enum';
import { LocalstorageType } from '../../enums/localstorage.enum';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loginUrl = `http://${environment.api_server.addr}:${environment.api_server.port}${EndpointType.LOGIN}`;
  private _registerUrl = `http://${environment.api_server.addr}:${environment.api_server.port}${EndpointType.REGISTER}`;
  private _newPostUrl = `http://${environment.api_server.addr}:${environment.api_server.port}${EndpointType.POST}`;
  private _tokenGuardUrl = `http://${environment.api_server.addr}:${environment.api_server.port}${EndpointType.TOKENGUARD}`;

  // current user data
  /**
   * in this app, jwt is used. since there is no store in backend, 
   * user data(except secret) is saved in localstorage.
   * this is to handle the user data
   */
  private currentUserSource = new BehaviorSubject<ICurrentUser>({_id:null, name:null, email:null, user_name:null});

  constructor(private _http: HttpClient, private _router:Router) { }

  registerUser(user): Observable<any> {
    return this._http.post<any>(this._registerUrl, user);
  }

  loginUser(user): Observable<any> {
    return this._http.post<any>(this._loginUrl, user);
  }

  // these two are here because this http request needs 'Authentication field injected to body'
  createPost(req_body: IPostCreateReq): Observable<IPostCreateRes> {
    return this._http.post<IPostCreateReq>(this._newPostUrl, req_body);
  }

  updatePost(req_body: IPostUpdateReq): Observable<any> {
    return this._http.put<any>(this._newPostUrl + '/' + req_body._id, req_body);
  }

  deletePost(req_body: IPostDeleteReq): Observable<IPostDeleteRes> {
    return this._http.delete<any>(this._newPostUrl + '/' + req_body._id);
  }

  // 지금의 토큰과 파라미터의 유저네임이 같은지 확인하는 api
  tokenGuard(user_name): Observable<any> {
    return this._http.get<any>(this._tokenGuardUrl + '/' +  user_name);
  }

  loggedIn() {
    return !!localStorage.getItem(LocalstorageType.TOKEN); //!!를 쓰면 있는지 없는지 반환함
  }

  getToken() {
    return localStorage.getItem(LocalstorageType.TOKEN);
  }

  updateCurrentUser(user: ICurrentUser) {
    localStorage.setItem(LocalstorageType.CURRENT_USER, JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logoutUser() {
    localStorage.removeItem(LocalstorageType.TOKEN);
    localStorage.removeItem(LocalstorageType.CURRENT_USER);
    this.currentUserSource.next({_id:null, name:null, email:null, user_name:null});
  }



  //get set
  get currentUser(): Observable<ICurrentUser> {
    return this.currentUserSource.asObservable();
  }
}