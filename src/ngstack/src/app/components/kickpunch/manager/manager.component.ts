import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../service/data/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { ICurrentRoute, IPost, IUser, IBlogUpdateRes, IBlogUpdateReq } from '../../../models';
import { ToastrService } from '../../common/toastr/toastr.service';
import { ToastrType } from 'src/app/enums/toastr.enum';
import { SessionService } from 'src/app/service/session/session.service';
import { RouterLinkType } from '../../../enums/router-link.enum';

@Component({
	selector: 'app-manager',
	templateUrl: './manager.component.html',
	styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
	//note that currentlt logged in user and component's owner user can be different

	title = "he"
	description = "he"

	titleDefault;
	descriptionDefault;

	currentUser: IUser = {};
	currentRoute: ICurrentRoute = {};
	posts: IPost[] = [];

	constructor(
		private router: Router, 
		private route: ActivatedRoute,
		private dataService: DataService,
		private sessionService: SessionService,
		private toastrService: ToastrService
	) { }

	ngOnInit() {
		this.loadData();
	}

	loadData() {
		this.route.params.subscribe(params => {
			this.currentRoute.userName = params.userName;
		});
		this.sessionService.currentUser.subscribe(user => {
			this.currentUser = user;
			this.refreshPostList();
			this.refreshBlog();
		});
	}

	refreshPostList() {
		this.dataService.getManagerPost(this.currentUser.userName).subscribe(
			res => {
				if (!res.RESULT) {
					this.toastrService.changeToastr(ToastrType.INVALID_REQUEST);
					this.router.navigate(['/' + RouterLinkType.NOTFOUND]);
				}
				this.posts = res.response;
			}, 
			err => {
				if (err instanceof HttpErrorResponse) {
					if (err.status === 401) {
						this.router.navigate(['/login']);
					}
				}
			}
		);
	}

	refreshBlog() {
		this.dataService.getBlogInfo(this.currentUser.userName).subscribe(
			res => {
				if (res.RESULT) {
					const {title, description} = res.response;
					this.title = title;
					this.description = description;

					this.titleDefault = title;
					this.descriptionDefault = description;
				}
			}, 
			err => {
				this.router.navigateByUrl('/notfound');
			}
		);
	}

	goToPost(postId: string) {
		this.router.navigate(['/' + this.currentUser.userName + '/post/' + postId]);
	}

	goToEdit(postId: string) {
		this.router.navigate(['/' + this.currentUser.userName + '/post/' + postId + '/edit']);
	}

	deletePost(postId: string) {
		// TODO: message is including postId, it is not readable from user, change it to post title
		const confirm = window.confirm("Deleting post");
		if (confirm) {
			this.dataService.deletePost({id: postId}).subscribe(
				res => {
					if (!res.RESULT) {
						this.toastrService.changeToastr(ToastrType.DELETE_POST_FAIL);	
					} else {
						this.toastrService.changeToastr(ToastrType.DELETE_POST_SUCCESS);
						this.refreshPostList();
					}
				}, 
				err => {
					this.toastrService.changeToastr(ToastrType.DELETE_POST_FAIL);
				}
			);
		} else {

		}
	}

	changeTitle() {
		const request: IBlogUpdateReq = {
			userId: this.currentUser.id,
			title: this.title,
			description: this.descriptionDefault
		};

		this.dataService.updateBlog(request, this.currentUser.userName).subscribe(
			res => {
				if (!res.RESULT) {
					this.toastrService.changeToastr(ToastrType.UPDATE_BLOG_FAIL);
				}
				this.toastrService.changeToastr(ToastrType.UPDATE_BLOG_SUCCESS);
				this.refreshBlog()
			},
			err => {
				this.toastrService.changeToastr(ToastrType.INVALID_REQUEST);
			}
		);
	}

	changeDescription() {
		const request: IBlogUpdateReq = {
			userId: this.currentUser.id,
			title: this.titleDefault,
			description: this.description
		};

		this.dataService.updateBlog(request, this.currentUser.userName).subscribe(
			res => {
				if (!res.RESULT) {
					this.toastrService.changeToastr(ToastrType.UPDATE_BLOG_FAIL);
				}
				this.toastrService.changeToastr(ToastrType.UPDATE_BLOG_SUCCESS);
				this.refreshBlog()
			},
			err => {
				this.toastrService.changeToastr(ToastrType.INVALID_REQUEST);
			}
		);
	}
}
