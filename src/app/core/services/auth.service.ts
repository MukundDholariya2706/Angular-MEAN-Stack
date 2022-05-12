import { Observable } from 'rxjs';
import { User, LoginRes, SignupRes } from './../models/user';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
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
    return this.http.post<SignupRes>(
      `${environment.api_url}/users/signup`,
      body
    );
  }

  googleAuth(): Observable<LoginRes> {
    return this.http.get<LoginRes>(`${environment.api_url}/auth/google`);
  }

  isAuthenticated(token: any): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      }),
    };
    return this.http.get<boolean>(
      `${environment.api_url}/auth/authenticate`,
      httpOptions
    );
  }
}
