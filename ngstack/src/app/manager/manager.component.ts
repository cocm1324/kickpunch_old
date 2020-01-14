import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.sass']
})
export class ManagerComponent implements OnInit {

  cur_route;
  posts;

  constructor(private _dataService: DataService, private _router: Router, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getPostData();
    this.getRouteParam();
  }

  getPostData() {
    this._dataService.getPosts().subscribe(
      res => this.posts = res,
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
      this.cur_route = params.user;
    });
  }
}
