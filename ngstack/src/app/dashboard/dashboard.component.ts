import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  //check if

  cur_route: string;
  posts = [];
  user = {};

  constructor(private _dataService: DataService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.getRouteParam();
    this.getUserData();
    this.getPostData();
  }

  getRouteParam() {
    this._route.params.subscribe(params => {
      this.cur_route = params.user;
    });
  }

  getUserData() {
    this._dataService.getUserData(this.cur_route).subscribe(
      res => this.user = res.user,
      err => {
        this._router.navigateByUrl('/notfound')
      }
    );
  }

  getPostData() {
    this._dataService.getExposedPostsByUserName(this.cur_route).subscribe(
      res => {
        this.posts = res.posts;

        this.posts.forEach(post => {
          console.log(JSON.stringify(post));
        })
      },
      err => console.log(err)
    );
  }

}
