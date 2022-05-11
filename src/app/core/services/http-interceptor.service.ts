// set token to header part of api when it called
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private jwtService: JwtService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    const token = this.jwtService.getToken();
    if (token) {
      const _req = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
      return next.handle(_req);
    }
  }
}
