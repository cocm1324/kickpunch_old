import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../service/data/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

import { 
	ICurrentRoute, 
	IPost,
	IUser
} from '../../../models';
import { ToastrService } from '../../common/toastr/toastr.service';
import { ToastrType } from 'src/app/enums/toastr.enum';
import { SessionService } from 'src/app/service/session/session.service';

@Component({
	selector: 'app-manager',
	templateUrl: './manager.component.html',
	styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
	//note that currentlt logged in user and component's owner user can be different

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

			this.dataService.getManagerPost(this.currentUser.userName).subscribe(res => {
				this.posts = res.response;
			}, err => {
				console.log(err);
				if(err instanceof HttpErrorResponse) {
					if (err.status === 401) {
						this.router.navigate(['/login']);
					}
				}
			});
		});
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
			this.dataService.deletePost({_id: postId}).subscribe(res => {
				this.toastrService.changeToastr(ToastrType.DELETE_POST_SUCCESS);
			}, err => {
				this.toastrService.changeToastr(ToastrType.DELETE_POST_FAIL);
			});
		} else {

		}
	}
}
