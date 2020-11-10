import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
/* Helpers */
import { JwtHelperService } from '@auth0/angular-jwt';
/* RxJs */
import { take, exhaustMap } from 'rxjs/operators';
/* NgRx */
import { State } from './../state/app.state';
import { Store } from '@ngrx/store';
import { getUserToken } from './state/index';
import { logoutUser } from './state/actions/auth-page.actions';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<State>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select(getUserToken).pipe(
      take(1),
      exhaustMap((token) => {
        const helper = new JwtHelperService();
        const isExpired = helper.isTokenExpired(token);
        if (!token) {
          return next.handle(req);
        }
        if (isExpired) {
          localStorage.removeItem('userData');
          this.store.dispatch(logoutUser());
          return next.handle(req);
        }
        const modifiedReq = req.clone({
          headers: new HttpHeaders({
            Authorization: `Bearer ${token}`,
          }),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
