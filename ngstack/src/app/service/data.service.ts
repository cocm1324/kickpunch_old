import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _userUrl = "http://localhost:3000/api/user/"
  private _postUrl = "http://localhost:3000/api/post/";

  constructor(private _http: HttpClient) { }

  getUserData(userName: string): Observable<any> {
    return this._http.get<any>(this._userUrl + userName);
  }

  getExposedPostsByUserName(userName: string): Observable<any> {
    return this._http.get<any>(this._postUrl + userName);
  }

  getAllPostsByUserName(userName: string): Observable<any> {
    return this._http.get<any>(this._postUrl +  userName + '/all');
  }

  createPost(userId: string, post): Observable<any> {
    return this._http.post<any>(this._postUrl + userId, post);
  } 
}
