import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../service/data/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICurrentRoute, IPost, IBlog } from "../../../models"

@Component({
	selector: 'app-dashboard',
	templateUrl: './blog.component.html',
	styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

	dataReady: boolean = false;
	currentRoute: ICurrentRoute = {userName: null};
	posts: IPost[];
	blogInfo: IBlog;

	get blogTitle() {
		return this.blogInfo.title;
	}
	get blogDesc() {
		return this.blogInfo.description;
	}

	constructor(
		private route: ActivatedRoute, 
		private router: Router,
		private dataService: DataService
	) { }

	ngOnInit() {
		this.loadData();
	}

	loadData() {
		this.route.params.subscribe(params => {
			const {userName} = params;
			this.currentRoute.userName = userName;
			this.dataService.getBlogInfo(userName).subscribe(
				res => {
					if (res.RESULT) {
						this.blogInfo = res.response;
					}
				}, 
				err => {
					this.router.navigateByUrl('/notfound');
				}
			);
			this.dataService.getBlogPost(userName).subscribe(
				res => {
					if (res.RESULT) {
						this.posts = res.response;
						this.dataReady = true;
					}
				},
				err => {
					console.log(err)
				}
			);
		});
	}

	goToPost(postId) {
		this.router.navigate([`${this.currentRoute.userName}/post/${postId}`]);
	}
}
