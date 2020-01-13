import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private _http: HttpClient) { }


  // 
  private _postsUrl = "http://localhost:3000/api/posts";
  getPosts(): Observable<any> {
    return this._http.get<any>(this._postsUrl);
  }

  private _posts1Url = "http://localhost:3000/api/posts/posts1";
  getPosts1(): Observable<any> {
    return this._http.get<any>(this._posts1Url);
  }


  private _createPostURL = "http://localhost:3000/api/posts/create";
  createPost(post): Observable<any> {
    return this._http.post<any>(this._createPostURL, post);
  } 
}
