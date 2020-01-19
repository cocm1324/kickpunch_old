import { Component, OnInit, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Post } from 'src/assets/post';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  @ViewChild('exposed') exposed: ElementRef;
  @ViewChild('priority') priority: ElementRef;

  
  postForm = this._fb.group({
    title: ['', Validators.required],
    contents: ['', Validators.required],
  });

  post: Post = new Post();

  constructor(private _fb: FormBuilder, private _auth: AuthService, private _router: Router) { 
    
  }

  ngOnInit() {
  }


  save():void {
    this.post.user_id = JSON.parse(localStorage.getItem('current_user'))._id;
    this.post.title = this.postForm.get('title').value;
    this.post.contents = this.postForm.get('contents').value;
    this.post.exposed = this.exposed.nativeElement.checked;
    this.post.priority = this.priority.nativeElement.value;

    this._auth.newPost(this.post).subscribe(
      res => {
        // TODO: implement toastr
        // TODO: Redirect to created post
        let url = '/' + JSON.parse(localStorage.getItem('current_user')).email.split('@')[0] + "/manager";
        this._router.navigate([url]);
      },
      err => {
        console.log(err);
      }
    );
  }
}