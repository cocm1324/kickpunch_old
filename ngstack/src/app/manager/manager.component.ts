import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.sass']
})
export class ManagerComponent implements OnInit {

  cur_route;
  posts;

  constructor(private _dataService: DataService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getPostData();
    this.getRouteParam();
  }

  getPostData() {
    this._dataService.getPosts().subscribe(
      res => this.posts = res,
      err => console.log(err)
    );
  }

  getRouteParam() {
    this._route.params.subscribe(params => {
      this.cur_route = params.user;
    });
  }
}
