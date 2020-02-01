import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'src/app/components/common/toastr/toastr.service';
import { DataService } from 'src/app/service/data/data.service';

import { IPost, IPostUpdateReq } from '../../../models';
import { ToastrType } from '../../../enums/toastr.enum';


@Component({
  selector: 'app-updator',
  templateUrl: './updator.component.html',
  styleUrls: ['./updator.component.scss']
})
export class UpdatorComponent implements OnInit {

  current_user;
  current_post: IPost;
  
  postForm: FormGroup;

  @ViewChild('exposed') exposed: ElementRef;
  @ViewChild('priority') priority: ElementRef;

  constructor(private _fb: FormBuilder, private _auth: AuthService, private _router: Router, private _toastr: ToastrService, private _data: DataService, private _route: ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.postForm = this._fb.group({
      title: ['', Validators.required],
      contents: ['', Validators.required],
    });

    this.getCurrentUser();
    this.getCurrentPost();
  }

  getCurrentUser() {
    this._auth.currentUser.subscribe(user => this.current_user = user);
  }

  getCurrentPost() {
    this._route.params.subscribe(params => {
      this._data.getPostById(params.post_id).subscribe(
        //load post contents to form
        err => {
          this._toastr.changeToastr(ToastrType.UPDATE_POST_FAIL);
        },
        res => {
          this.current_post = res.post;
          this.current_post._id = params.post_id;

          this.postForm.patchValue({
            title: this.current_post.title,
            contents: this.current_post.contents
          });

          this.exposed.nativeElement.checked = this.current_post.exposed;
          this.priority.nativeElement.value = this.current_post.priority;
        }
      )
    })
  }

  update() {
    let post: IPostUpdateReq = {
        _id: this.current_post._id,
        title: this.postForm.get('title').value,
        contents: this.postForm.get('contents').value,
        exposed: this.exposed.nativeElement.checked,
        priority: this.priority.nativeElement.value
    }

    this._auth.updatePost(post).subscribe(
      err => {
        this._toastr.changeToastr(ToastrType.UPDATE_POST_FAIL);
      },
      res => {
        let url = '/' + this.current_user.user_name + "/post/" + this.current_post._id;
        this._router.navigate([url]);

        this._toastr.changeToastr(ToastrType.UPDATE_POST_SUCCESS);
      }
    );
  }

}
