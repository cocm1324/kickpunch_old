import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'src/app/components/common/toastr/toastr.service';
import { DataService } from 'src/app/service/data/data.service';

import { ICurrentUser, IPostCreateReq } from '../../../models';
import { ToastrType } from 'src/app/enums/toastr.enum';

@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

	@ViewChild('exposed') exposed: ElementRef;
	@ViewChild('priority') priority: ElementRef;

	postForm: FormGroup;
	current_user: ICurrentUser;



	constructor(
		private _fb: FormBuilder, private _auth: AuthService, private _router: Router,
		private _toastr: ToastrService, private _data: DataService, private _route: ActivatedRoute
	) { }

	ngOnInit() {
		this.initForm();
		this.getCurrentUser();
	}




	initForm() {
		this.postForm = this._fb.group({
			title: ['', Validators.required],
			contents: ['', Validators.required]
		});
	}

	getCurrentUser() {
		this._auth.currentUser.subscribe(user => this.current_user = user);
	}

	save(): void {
		let post: IPostCreateReq = {
			title: this.postForm.get('title').value,
			contents: this.postForm.get('contents').value,
			exposed: this.exposed.nativeElement.checked,
			priority: this.priority.nativeElement.value
		}

		this._auth.createPost(post).subscribe(
			res => {
			  this._router.navigate(['/' + res.user_id + "/post/" + res._id]);
			  this._toastr.changeToastr(ToastrType.CREATE_POST_SUCCESS);
			},
			err => {
				this._toastr.changeToastr(ToastrType.CREATE_POST_FAIL);
			}
		  );
	}
}