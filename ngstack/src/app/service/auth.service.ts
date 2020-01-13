import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loginUrl = "http://localhost:3000/api/users/login";
  private _registerUrl = "http://localhost:3000/api/users/register";

  constructor(private _http: HttpClient) { }

  registerUser(user): Observable<any> {
    return this._http.post<any>(this._registerUrl, user);
  }

  loginUser(user): Observable<any> {
    return this._http.post<any>(this._loginUrl, user)
  }
}
