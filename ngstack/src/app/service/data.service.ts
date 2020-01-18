import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _postUrl = "http://localhost:3000/api/post/";

  constructor(private _http: HttpClient) { }

  getExposedPostsByUserId(userId: string): Observable<any> {
    return this._http.get<any>(this._postUrl + userId);
  }

  getAllPostsByUserId(userId: string): Observable<any> {
    return this._http.get<any>(this._postUrl +  userId + '/all');
  }

  createPost(userId: string, post): Observable<any> {
    return this._http.post<any>(this._postUrl + userId, post);
  } 
}
