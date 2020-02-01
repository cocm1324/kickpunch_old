import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../service/data/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IPost, ICurrentRoute } from '../../../models';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {

	cur_route: ICurrentRoute;
	post: IPost = {title: null, created: null, contents: null};
	postUser = {name: null};

	constructor(private _data: DataService, private _router: Router, private _route: ActivatedRoute) { }

	ngOnInit() {
		this.getRouteParam();
		this.getPost(this.cur_route.postId);
		this.getPostUser(this.cur_route.userName);
	}

	getRouteParam() {
		this._route.params.subscribe(params => {
		this.cur_route = {postId: params.post_id, userName: params.user}
		});
	}

	getPost(postId) {
		this._data.getPostById(postId).subscribe(
		err => {
			console.log(err);
		},
		res => {
			this.post = res.post;
		}
		);
	}
	
	getPostUser(userName) {
		this._data.getUserData(userName).subscribe(
		res => this.postUser = res.user,
		err => console.log(err)
		)
	}
}
