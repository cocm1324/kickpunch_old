import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'src/app/components/common/toastr/toastr.service';
import { DataService } from 'src/app/service/data/data.service';
import { IPostCreateReq, IUser } from '../../../models';
import { ToastrType } from 'src/app/enums/toastr.enum';
import { SessionService } from 'src/app/service/session/session.service';

@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

	@ViewChild('exposed') exposed: ElementRef;
	@ViewChild('priority') priority: ElementRef;

	postForm: FormGroup;
	currentUser: IUser;

	constructor(
		private fb: FormBuilder, 
		private router: Router,
		private dataService: DataService,
		private sessionService: SessionService,
		private toastrService: ToastrService
	) { }

	ngOnInit() {
		this.initForm();
		this.getCurrentUser();
	}

	initForm() {
		this.postForm = this.fb.group({
			title: ['', Validators.required],
			contents: ['', Validators.required]
		});
	}

	getCurrentUser() {
		this.sessionService.currentUser.subscribe(user => this.currentUser = user);
	}

	save(): void {
		const request: IPostCreateReq = {
			title: this.postForm.get('title').value,
			contents: this.postForm.get('contents').value,
			exposed: this.exposed.nativeElement.checked,
			priority: this.priority.nativeElement.value
		}

		this.dataService.createPost(request).subscribe(res => {
			this.router.navigate(['/' + res.user_id + "/post/" + res._id]);
			this.toastrService.changeToastr(ToastrType.CREATE_POST_SUCCESS);
		}, err => {
			this.toastrService.changeToastr(ToastrType.CREATE_POST_FAIL);
		});
	}
}