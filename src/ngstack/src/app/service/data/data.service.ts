import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EndpointType } from '../../enums/endpoint.enum';

import { 
	IPost, IPostReq, IPostRes, IRegisterReq, IRegisterRes, 
	ILoginRes, ILoginReq, IPostCreateRes, IPostCreateReq, IPostUpdateReq, 
	IPostDeleteReq, IPostDeleteRes, IGetBlog, IGetBlogPost 
} from '../../models';
import { environment } from 'src/environments/environment';

@Injectable({
  	providedIn: 'root'
})
export class DataService {
	private postUrl = `http://${environment.api_server.addr}:${environment.api_server.port}${EndpointType.POST}`;
	private postsUrl = `http://${environment.api_server.addr}:${environment.api_server.port}${EndpointType.POSTS}`;
	private loginUrl = `http://${environment.api_server.addr}:${environment.api_server.port}${EndpointType.LOGIN}`;
	private registerUrl = `http://${environment.api_server.addr}:${environment.api_server.port}${EndpointType.REGISTER}`;
	private newPostUrl = `http://${environment.api_server.addr}:${environment.api_server.port}${EndpointType.POST}`;
	private tokenGuardUrl = `http://${environment.api_server.addr}:${environment.api_server.port}${EndpointType.TOKENGUARD}`;

	constructor(private _http: HttpClient) { }

	// get a user object by username('example1'@gmail.com; 'example1' is username)
	getBlogInfo(userName: string): Observable<IGetBlog> {
		return this._http.get<IGetBlog>(`http://${environment.api_server.addr}:${environment.api_server.port}/api/blog/${userName}`);
	}
	getBlogPost(userName: string): Observable<IGetBlogPost> {
		return this._http.get<IGetBlogPost>(`http://${environment.api_server.addr}:${environment.api_server.port}/api/blog/${userName}/post`);
	}
	getAllPostsByUserName(user_id: string): Observable<IPost[]> {
		return this._http.get<IPost[]>(this.postsUrl + '/' + user_id + '/all');
	}
	getPost(req: IPostReq): Observable<IPostRes> {
		return this._http.get<IPostRes>(this.postUrl + '/' + req._id);
	}

	runRegister(user: IRegisterReq): Observable<IRegisterRes> {
		return this._http.post(this.registerUrl, user);
	}
	runLogin(user: ILoginReq): Observable<ILoginRes> {
		return this._http.post(this.loginUrl, user);
	}

	// post
	createPost(req_body: IPostCreateReq): Observable<IPostCreateRes> {
		return this._http.post<IPostCreateReq>(this.newPostUrl, req_body);
	}
	updatePost(req_body: IPostUpdateReq): Observable<any> {
		return this._http.put<any>(this.newPostUrl + '/' + req_body._id, req_body);
	}
	deletePost(req_body: IPostDeleteReq): Observable<IPostDeleteRes> {
		return this._http.delete<any>(this.newPostUrl + '/' + req_body._id);
	}

	// 지금의 토큰과 파라미터의 유저네임이 같은지 확인하는 api
	runVerifySession(user_name): Observable<any> {
		return this._http.get<any>(this.tokenGuardUrl + '/' +  user_name);
	}
}
