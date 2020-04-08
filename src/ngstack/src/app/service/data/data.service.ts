import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EndpointType } from '../../enums/endpoint.enum';

import { 
	IPost, IPostReq, IPostRes, IRegisterReq, IRegisterRes, 
	ILoginRes, ILoginReq, IPostCreateRes, IPostCreateReq, IPostUpdateReq, 
	IPostDeleteReq, IPostDeleteRes, IGetBlog, IGetBlogPost, ISessionVerifyReq, IResponse, IGetManagerPost 
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

	constructor(private http: HttpClient) { }

	// get a user object by username('example1'@gmail.com; 'example1' is username)
	getBlogInfo(userName: string): Observable<IGetBlog> {
		return this.http.get<IGetBlog>(`http://${environment.api_server.addr}:${environment.api_server.port}/api/blog/${userName}`);
	}
	getBlogPost(userName: string): Observable<IGetBlogPost> {
		return this.http.get<IGetBlogPost>(`http://${environment.api_server.addr}:${environment.api_server.port}/api/blog/${userName}/post`);
	}
	getManagerPost(userName: string, sort?: string, page?: number): Observable<IGetManagerPost> {
		return this.http.get<IGetManagerPost>(
			`http://${environment.api_server.addr}:${environment.api_server.port}/api/manager/${userName}/post${sort || page ? '?' : ''}${sort ? 'sort=' + sort : ''}${sort && page ? '&page=' + page : page ? 'page=' + page : ''}`
		);
	}
	getPost(req: IPostReq): Observable<IPostRes> {
		return this.http.get<IPostRes>(this.postUrl + '/' + req._id);
	}

	runRegister(user: IRegisterReq): Observable<IRegisterRes> {
		return this.http.post(this.registerUrl, user);
	}
	runLogin(user: ILoginReq): Observable<ILoginRes> {
		return this.http.post(this.loginUrl, user);
	}

	// post
	createPost(req_body: IPostCreateReq): Observable<IPostCreateRes> {
		return this.http.post<IPostCreateReq>(this.newPostUrl, req_body);
	}
	updatePost(req_body: IPostUpdateReq): Observable<any> {
		return this.http.put<any>(this.newPostUrl + '/' + req_body._id, req_body);
	}
	deletePost(req_body: IPostDeleteReq): Observable<IPostDeleteRes> {
		return this.http.delete<any>(this.newPostUrl + '/' + req_body._id);
	}

	runVerifySession(req: ISessionVerifyReq): Observable<IResponse> {
		return this.http.post<IResponse>(`http://${environment.api_server.addr}:${environment.api_server.port}/api/session`, req);
	}
}
