import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'src/app/service/toastr.service';
import { distinctUntilChanged, skip } from 'rxjs/operators';

@Component({
  selector: 'app-toastr',
  templateUrl: './toastr.component.html',
  styleUrls: ['./toastr.component.scss']
})
export class ToastrComponent implements OnInit {

  messages = [];
  // visibility = "hidden";  
  visibility = "visible";  

  constructor(private _toastr:ToastrService) { }

  ngOnInit() {
    this.getToastr();
  }

  getToastr() {
    this._toastr.toastr$.pipe(
      distinctUntilChanged((prev, curr) => prev.timestamp === curr.timestamp),
      skip(1)
    ).subscribe(message => {
      this.messages.push(message);
      // this.visibility = "visible";
      this.timeoutPop(3000);
      // this.timeoutHide(3000);
    });
  }

  timeoutPop(time: number) {
    setTimeout(() => this.messages.shift(), time);
  }

  timeoutHide(time: number) {
    setTimeout(() => this.visibility = "hidden", time);
  }
}
