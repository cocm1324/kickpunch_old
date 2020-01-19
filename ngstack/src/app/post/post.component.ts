import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass']
})
export class PostComponent implements OnInit {

  cur_route: string;
  post = {};

  constructor(private _data: DataService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getRouteParam();
    this.getPost(this.cur_route);
  }

  getRouteParam() {
    this._route.params.subscribe(params => {
      this.cur_route = params.post_id;
    });
  }

  getPost(post_id) {
    this._data.getPostById(post_id).subscribe(
      res => {
        this.post = res.post;
        console.log(this.post);
      },
      err => {
        console.log(err);
      }
    );
  }
  
}
