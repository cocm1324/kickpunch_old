import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {

  private currentUserIdSource = new BehaviorSubject("");
  currentUserId = this.currentUserIdSource.asObservable();

  // callback url: when sign in or sign out, it holds current url, and after action, redirect to this url
  private callbackURLSource = new BehaviorSubject("");
  callbackURL = this.callbackURLSource.asObservable();

  constructor() { }

  changeCurrentUserId(userId: string) {
    this.currentUserIdSource.next(userId);
  }

  changeCallbackURL(url: string) {
    this.callbackURLSource.next(url);
  }
}
