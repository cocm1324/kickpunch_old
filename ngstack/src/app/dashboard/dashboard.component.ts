import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {

  posts = [];

  constructor(private _dataService: DataService) { }

  ngOnInit() {
    this._dataService.getPosts().subscribe(
      res => this.posts = res,
      err => console.log(err)
    );
  }

}
