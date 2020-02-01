import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EndpointType } from '../../enums/endpoint.enum';

import { IPost } from '../../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _userUrl = `http://${environment.api_server.addr}:${environment.api_server.port}${EndpointType.USER}`;
  private _postUrl = `http://${environment.api_server.addr}:${environment.api_server.port}${EndpointType.POST}`;

  constructor(private _http: HttpClient) { }

  // get a user object by username('example1'@gmail.com; 'example1' is username)
  getUserData(userName: string): Observable<any> {
    return this._http.get<any>(this._userUrl + '/' + userName);
  }

  getExposedPostsByUserName(userName: string): Observable<any> {
    return this._http.get<any>(this._postUrl + '/' + userName);
  }

  getAllPostsByUserName(userName: string): Observable<any> {
    return this._http.get<any>(this._postUrl + '/' + userName + '/all');
  }

  getPostById(postId: string): Observable<IPost> {
    return this._http.get<IPost>(this._postUrl + '/' + postId);
  }

  createPost(userId: string, post): Observable<any> {
    return this._http.post<any>(this._postUrl + '/' + userId, post);
  } 
}
