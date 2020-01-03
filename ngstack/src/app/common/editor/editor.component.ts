import { Component, OnInit, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Post } from 'src/assets/post';


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

  constructor(private _fb: FormBuilder) { 
    
  }

  ngOnInit() {
  }


  save():void {
    this.post.title = this.postForm.get('title').value;
    this.post.contents = this.postForm.get('contents').value;
    this.post.exposed = this.exposed.nativeElement.checked;
    this.post.priority = this.priority.nativeElement.value;
    console.log(this.post);
  }
}
