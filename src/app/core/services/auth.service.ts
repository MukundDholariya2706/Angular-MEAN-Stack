import { Observable } from 'rxjs';
import { User, LoginRes, SignupRes } from './../models/user';
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

  signup(body: User): Observable<SignupRes> {
    return this.http.post<SignupRes>(`${environment.api_url}/users/signup`, body);
  }
}
