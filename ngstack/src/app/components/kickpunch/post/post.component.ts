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

	current_route: ICurrentRoute;
	author: IUser = { user_name: null };
	post: IPost = { title: "", created: new Date(), contents: "" };

	constructor(private _data: DataService, private _router: Router, private _route: ActivatedRoute, private _toastr: ToastrService) { }

	ngOnInit() {
		this.getRouteParam();
		this.getPost({_id: this.current_route.post_id});
	}

	getRouteParam() {
		this._route.params.subscribe(params => {
			this.current_route = {
				post_id: params.post_id, user_name: params.user_name
			}
			
			if(this.current_route.post_id == "undefined" && this.current_route == "undefined") {
				this._router.navigate(['/' + RouterLinkType.NOTFOUND]);
			}
		});
	}

	getPost(req_body: IPostReq) {
		this._data.getPost(req_body).subscribe({
			next: res_body => {
				this.author = res_body.author;
				this.post = res_body.post;
			},
			error: err => {
				this._toastr.changeToastr(ToastrType.INVALID_REQUEST);
				this._router.navigate(['/' + RouterLinkType.NOTFOUND]);
			},
			complete: () => {}
		});
	}
}
