import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _userUrl = "http://localhost:3000/api/user/"
  private _postUrl = "http://localhost:3000/api/posts/";

  private _apiUrl = "http://localhost:3000/api/";

  constructor(private _http: HttpClient) { }

  getUserData(userName: string): Observable<any> {
    return this._http.get<any>(this._apiUrl + 'user/' + userName);
  }

  getExposedPostsByUserName(userName: string): Observable<any> {
    return this._http.get<any>(this._apiUrl + 'posts/' + userName);
  }

  getAllPostsByUserName(userName: string): Observable<any> {
    return this._http.get<any>(this._apiUrl + 'posts/' + userName + '/all');
  }

  getPostById(postId: string): Observable<any> {
    return this._http.get<any>(this._apiUrl + 'post/' + postId);
  }

  createPost(userId: string, post): Observable<any> {
    return this._http.post<any>(this._apiUrl + 'post/' + userId, post);
  } 
}
