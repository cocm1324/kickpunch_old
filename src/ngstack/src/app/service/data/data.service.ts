import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EndpointType } from '../../enums/endpoint.enum';

import { IUser, IPost, IPostReq, IPostRes } from '../../models';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _userUrl = `http://${environment.api_server.addr}:${environment.api_server.port}${EndpointType.USER}`;
  private _postUrl = `http://${environment.api_server.addr}:${environment.api_server.port}${EndpointType.POST}`;
  private _postsUrl = `http://${environment.api_server.addr}:${environment.api_server.port}${EndpointType.POSTS}`;

  constructor(private _http: HttpClient) { }

  // get a user object by username('example1'@gmail.com; 'example1' is username)
  getUserData(user_name: string): Observable<IUser> {
    return this._http.get<IUser>(this._userUrl + '/' + user_name);
  }

  getExposedPostsByUserName(user_name: string): Observable<IPost[]> {
    return this._http.get<IPost[]>(this._postsUrl + '/' + user_name);
  }

  getAllPostsByUserName(user_id: string): Observable<IPost[]> {
    return this._http.get<IPost[]>(this._postsUrl + '/' + user_id + '/all');
  }

  getPost(req: IPostReq): Observable<IPostRes> {
    return this._http.get<IPostRes>(this._postUrl + '/' + req._id);
  }

  createPost(userId: string, post): Observable<any> {
    return this._http.post<any>(this._postUrl + '/' + userId, post);
  } 


  // getPageSmasherMockUp(): Observable<any> {
  //   return this._http.get<any>()
  // }
}
