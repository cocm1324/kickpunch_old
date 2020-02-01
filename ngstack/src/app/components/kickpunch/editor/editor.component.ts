import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Post } from 'src/assets/post';
import { AuthService } from 'src/app/service/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'src/app/components/common/toastr/toastr.service';
import { DataService } from 'src/app/service/data/data.service';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  postForm: FormGroup;
  post: Post = new Post();

  current_user;
  current_post = {
    title: null,
    contents: null
  };

  @ViewChild('exposed') exposed: ElementRef;
  @ViewChild('priority') priority: ElementRef;

  constructor(private _fb: FormBuilder, private _auth: AuthService, private _router: Router, private _toastr: ToastrService, private _data: DataService, private _route: ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.postForm = this._fb.group({
      title: ['', Validators.required],
      contents: ['', Validators.required]
    });
    
    this.getCurrentUser();
  }

  getCurrentUser() {
    this._auth.currentUser.subscribe(user => this.current_user = user);
  }

  save(): void {
    console.log(this.postForm.getRawValue());
  }
}