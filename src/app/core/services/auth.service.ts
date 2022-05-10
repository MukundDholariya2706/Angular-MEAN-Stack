import { Observable } from 'rxjs';
import { User, LoginRes } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(body: User): Observable<LoginRes> {
    return this.http.post<LoginRes>(`${environment.api_url}/users/login`, body);
  }

  signup(body: User): Observable<User> {
    return this.http.post<User>(`${environment.api_url}/users/signup`, body);
  }
}
