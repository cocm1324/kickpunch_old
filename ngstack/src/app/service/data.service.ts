import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _postsUrl = "http://localhost:3000/api/posts";
  private _posts1Url = "http://localhost:3000/api/posts1";

  constructor(private _http: HttpClient) { }

  getPosts(): Observable<any> {
    return this._http.get<any>(this._postsUrl);
  }

  getPosts1(): Observable<any> {
    return this._http.get<any>(this._posts1Url);
  }
}
