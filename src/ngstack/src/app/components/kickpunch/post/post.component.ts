import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../service/data/data.service';
import { Router, ActivatedRoute } from '@angular/router';

import { IPost, ICurrentRoute, IUser, IPostReq } from '../../../models';
import { RouterLinkType } from '../../../enums/router-link.enum';
import { ToastrType } from '../../../enums/toastr.enum'
import { ToastrService } from '../../common/toastr/toastr.service';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {

	currentRoute: ICurrentRoute;
	author: IUser = { userName: null };
	post: IPost = { title: "", created: new Date(), contents: "" };

	constructor(
		private data: DataService, 
		private router: Router, 
		private route: ActivatedRoute, 
		private toastr: ToastrService
	) { }

	ngOnInit() {
		this.getRouteParam();
	}

	getRouteParam() {
		this.route.params.subscribe(params => {
			this.currentRoute = {
				postId: params.postId, userName: params.userName
			}
			
			if(this.currentRoute.postId == "undefined" && this.currentRoute == "undefined") {
				this.router.navigate(['/' + RouterLinkType.NOTFOUND]);
			}

			const postData: IPostReq = {id: this.currentRoute.postId}
			this.getPost(postData);
		});
	}

	getPost(req: IPostReq) {
		this.data.getPost(req).subscribe(
			res => {
				if (!res.RESULT) {
					this.toastr.changeToastr(ToastrType.POST_NOT_FOUNT);
					this.router.navigate(['/' + RouterLinkType.NOTFOUND]);
				}
				const {userName} = res.response.user;
				const {created, updated, id, title, contents} = res.response.post;
				
				this.author = {
					userName: userName
				};
				this.post = {
					id: id,
					title: title,
					contents: contents,
					updated: updated,
					created: created
				};
			},
			err => {
				this.toastr.changeToastr(ToastrType.INVALID_REQUEST);
				this.router.navigate(['/' + RouterLinkType.NOTFOUND]);
			}
		);
	}
}
