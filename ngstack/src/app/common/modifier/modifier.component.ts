import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Post } from 'src/assets/post';
import { AuthService } from 'src/app/service/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'src/app/service/toastr.service';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.scss']
})
export class ModifierComponent implements OnInit {

  current_user;
  current_post;
  
  postForm;
  post: Post = new Post();

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
  }

  getCurrentUser() {
    this._auth.currentUser.subscribe(user => this.current_user = user);
  }


  save():void {
    this.post.user_id = this.current_user._id;
    this.post.title = this.postForm.get('title').value;
    this.post.contents = this.postForm.get('contents').value;
    this.post.exposed = this.exposed.nativeElement.checked;
    this.post.priority = this.priority.nativeElement.value;

    this._auth.newPost(this.post).subscribe(
      res => {
        let url = '/' + this.current_user.user_name + "/manager";
        this._router.navigate([url]);

        let message = {
          header: `Post created successfully`,
          body: "Do post more, would ya?",
          alert: "alert-success"
        }
        this._toastr.changeToastr(message);
      },
      err => {
        let message = {
          header: `Ooopse, please try again later`,
          body: "Something went wrong back there",
          alert: "alert-danger"
        }
        this._toastr.changeToastr(message);
      }
    );
  }

}
