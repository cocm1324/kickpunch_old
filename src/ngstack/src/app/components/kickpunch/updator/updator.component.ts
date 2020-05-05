import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'src/app/components/common/toastr/toastr.service';
import { DataService } from 'src/app/service/data/data.service';

import { IPost, IPostUpdateReq, IUser } from '../../../models';
import { ToastrType } from '../../../enums/toastr.enum';


@Component({
	selector: 'app-updator',
	templateUrl: './updator.component.html',
	styleUrls: ['./updator.component.scss']
})
export class UpdatorComponent implements OnInit {

	currentUser: IUser;
	currentPost: IPost;
	
	postForm: FormGroup;

	@ViewChild('exposed') exposed: ElementRef;
	@ViewChild('priority') priority: ElementRef;

	constructor(
		private fb: FormBuilder, 
		private router: Router, 
		private route: ActivatedRoute,
		private toastrService: ToastrService, 
		private dataService: DataService
	) { }

	ngOnInit() {
		this.postForm = this.fb.group({
			title: ['', Validators.required],
			contents: ['', Validators.required],
		});

		this.getData();
	}

	getData() {
		this.route.params.subscribe(params => {
			this.dataService.getPost({id: params.postId}).subscribe(
				res => {
					this.currentUser = res.response.user;
					this.currentPost = res.response.post;

					this.postForm.patchValue({
						title: this.currentPost.title,
						contents: this.currentPost.contents
					});

					this.exposed.nativeElement.checked = this.currentPost.exposed;
					this.priority.nativeElement.value = this.currentPost.priority;
				}, 
				err => {
					this.toastrService.changeToastr(ToastrType.UPDATE_POST_FAIL);
				}
			);
		});
	}

	update() {
		const request: IPostUpdateReq = {
			id: this.currentPost.id,
			title: this.postForm.get('title').value,
			contents: this.postForm.get('contents').value,
			exposed: this.exposed.nativeElement.checked,
			priority: this.priority.nativeElement.value
		}

		// TODO: I dont understand this, why response is comming in error? study it and make it understandable
		this.dataService.updatePost(request).subscribe(
			res => {	
				if (!res.RESULT) {
					this.toastrService.changeToastr(ToastrType.UPDATE_POST_FAIL);
				} else {
					this.toastrService.changeToastr(ToastrType.UPDATE_POST_SUCCESS);
					const url = '/' + this.currentUser.userName + "/post/" + this.currentPost.id;
					this.router.navigate([url]);
				}
			}, 
			err => {
				this.toastrService.changeToastr(ToastrType.UPDATE_POST_FAIL);
			}
		);
	}
}
