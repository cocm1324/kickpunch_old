import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toastr } from '../../../models/toastr.interface';
import { ToastrAlertType } from '../../../enums/toastr.enum';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {
  // Observable toastr source
  private _toastrSource = new BehaviorSubject<Toastr>({header: "", body: "", alert: ToastrAlertType.LIGHT, timestamp: new Date()});
  // toastr stream
  toastr$ = this._toastrSource.asObservable();

  //service command
  changeToastr(message: Toastr) {
    let toastrMessage: Toastr = {
      header: message.header,
      body: message.body,
      alert: message.alert,
      timestamp: new Date()
    }

    this._toastrSource.next(toastrMessage);
  }

  constructor() { }
}

// I get this part from https://stackoverflow.com/questions/34376854/delegation-eventemitter-or-observable-in-angular/35568924#35568924
// still need research about rxjs patterns
