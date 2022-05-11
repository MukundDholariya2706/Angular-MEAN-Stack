// canActivate guard for user validation router/

import { JwtService } from './jwt.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(private jwtService: JwtService, private router: Router) {}

  canActivate(): boolean {
    const isAuth = this.jwtService.isAuth();
    if (isAuth) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  canActivateChild(): boolean {
    return this.canActivate();
  }
}
