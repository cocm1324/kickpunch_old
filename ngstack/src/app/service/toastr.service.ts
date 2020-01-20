import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {
  // Observable toastr source
  private _toastrSource = new BehaviorSubject<ToastrMessage>({header: "", body: "", alert: 'alert-light', timestamp: new Date()});
  // toastr stream
  toastr$ = this._toastrSource.asObservable();

  //service command
  changeToastr(toastr) {
    this._toastrSource.next(toastr);
  }

  constructor() { }
}

// TODO: find out how to apply this
enum Alert {
  'alert-danger', 'alert-success', 'alert-warning', 'alert-info', 'alert-primary', 'alert-secondary', 'alert-light'
}

export class ToastrMessage {
  header: string;
  body: string;
  alert: string;
  timestamp: Date;
}

// I get this part from https://stackoverflow.com/questions/34376854/delegation-eventemitter-or-observable-in-angular/35568924#35568924
// still need research about rxjs patterns
