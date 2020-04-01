import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../service/data/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../../service/auth/auth.service';

import { 
	ICurrentRoute, 
	ICurrentUser,
	IPost
} from '../../../models';
import { ToastrService } from '../../common/toastr/toastr.service';
import { ToastrType } from 'src/app/enums/toastr.enum';

@Component({
	selector: 'app-manager',
	templateUrl: './manager.component.html',
	styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
	//note that currentlt logged in user and component's owner user can be different

	current_user: ICurrentUser = {};
	current_route: ICurrentRoute = {};
	posts: IPost[] = [];

	constructor(
		private _data: DataService,
		private _router: Router, 
		private _route: ActivatedRoute,
		private _auth: AuthService,
		private _toastr: ToastrService
	) { }

	ngOnInit() {
		this.getCurrentUser();
		this.getRouteParam();
		this.getPostData();
	}

	getCurrentUser(){
		this._auth.currentUser.subscribe(user => {
			this.current_user = user;
		});
	}

	getRouteParam() {
		this._route.params.subscribe(params => {
			this.current_route.user_name = params.user_name;
		});
	}

	getPostData() {
		this._data.getAllPostsByUserName(this.current_user.user_name).subscribe(
		res => {
			this.posts = res;
		},
		err => {
			console.log(err);
			if(err instanceof HttpErrorResponse) {
				if (err.status === 401) {
					this._router.navigate(['/login']);
				}
			}
		}
		);
	}

	//
	goToPost(postId: string) {
		this._router.navigate(['/' + this.current_user.user_name + '/post/' + postId]);
	}

	goToEdit(postId: string) {
		this._router.navigate(['/' + this.current_user.user_name + '/post/' + postId + '/edit']);
	}

	deletePost(postId: string) {
		// TODO: message is including postId, it is not readable from user, change it to post title
		let confirm = window.confirm("Deleting post")
		if (confirm) {
			this._auth.deletePost({_id: postId}).subscribe(
				res => {
					this._toastr.changeToastr(ToastrType.DELETE_POST_SUCCESS);
				},
				err => {
					this._toastr.changeToastr(ToastrType.DELETE_POST_FAIL);
				}
			)
		}
		else {

		}
	}
}
