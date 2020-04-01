import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../service/data/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICurrentRoute, IUser, IPost } from "../../../models"

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  //check if

  current_route: ICurrentRoute = {user_name: null};
  posts: IPost[];
  user: IUser;

  constructor(private _dataService: DataService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
    this.getRouteParam();
  }

  getRouteParam() {
    this._route.params.subscribe(params => {
      this.current_route.user_name = params.user_name;
      this.getUserData(this.current_route);
    });
  }

  getUserData(route: ICurrentRoute) {
    this._dataService.getUserData(route.user_name).subscribe(
      res => {
        this.user = res;
        this.getPostData(this.user);
      },
      err => {
        this._router.navigateByUrl('/notfound')
      }
    );
  }

  getPostData(user: IUser) {
    this._dataService.getExposedPostsByUserName(user.user_name).subscribe(
      res => {
        this.posts = res;
      },
      err => {
        console.log(err)
      }
    );
  }

}
