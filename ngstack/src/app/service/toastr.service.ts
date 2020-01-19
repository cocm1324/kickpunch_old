import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {
  // Observable toastr source
  private _toastrSource = new BehaviorSubject<Object>({header: "", body: "", alert: ""});
  // toastr stream
  toastr$ = this._toastrSource.asObservable();

  //service command
  changeToastr(toastr) {
    this._toastrSource.next(toastr);
  }

  constructor() { }
}

// I get this part from https://stackoverflow.com/questions/34376854/delegation-eventemitter-or-observable-in-angular/35568924#35568924
// still need research about rxjs patterns
