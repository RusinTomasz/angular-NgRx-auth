import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
/* Helpers */
import { JwtHelperService } from '@auth0/angular-jwt';
/* RxJs */
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
/* NgRx */
import { getUserToken } from './state/index';
import { Store } from '@ngrx/store';
import { logoutUser } from './state/actions/auth-page.actions';
import { State } from './../state/app.state';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<State>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.store.select(getUserToken).pipe(
      take(1),
      map((token) => {
        const helper = new JwtHelperService();
        const isExpired = helper.isTokenExpired(token);
        if (!isExpired) {
          return true;
        }
        localStorage.removeItem('userData');
        this.store.dispatch(logoutUser());
        return this.router.createUrlTree(['/login']);
      })
    );
  }
}
