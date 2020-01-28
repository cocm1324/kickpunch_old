import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as global from '../../.global';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _apiUrl = `http://${global.api_server.addr}:${global.api_server.port}/api/`;

  constructor(private _http: HttpClient) { }

  // get a user object by username('example1'@gmail.com; 'example1' is username)
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
