import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  cur_route: string;
  posts = [];

  constructor(private _dataService: DataService, private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getPostData();
    this.getRouteParam();
  }

  getPostData() {
    this._dataService.getPosts1().subscribe(
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
