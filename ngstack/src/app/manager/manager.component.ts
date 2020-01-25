import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.sass']
})
export class ManagerComponent implements OnInit {
  //note that currentlt logged in user and component's owner user can be different

  current_user;
  current_route;
  posts = [];

  constructor(private _data: DataService, private _router: Router, private _route: ActivatedRoute, private _auth: AuthService) { }

  ngOnInit() {
    this.getCurrentUser();
    this.getRouteParam();
    this.getPostData();
  }

  getCurrentUser(){
    this._auth.currentUser.subscribe(user => {
      this.current_user = user;
    });
  }

  getPostData() {
    this._data.getAllPostsByUserName(this.current_user).subscribe(
      res => this.posts = res.posts,
      err => {
        if(err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this._router.navigate(['/login']);
          }
        }
      }
    );
  }

  getRouteParam() {
    this._route.params.subscribe(params => {
      this.current_route = params.user;
    });
  }

  //
  goToPost(postId: string) {
    let url = '/';
    url = url + this.current_user.user_name + '/post/' + postId;

    this._router.navigate([url]);
  }

  goToEdit(postId: string) {
    let url = '/';
    url = url + this.current_user.user_name + '/post/' + postId + '/edit';

    this._router.navigate([url]);
  }
}
