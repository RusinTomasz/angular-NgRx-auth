import { Injectable } from '@angular/core';

/* Services */
import { AuthService } from './../auth.service';

/* RxJs */
import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthPageActions, AuthApiActions } from './actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  loginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthPageActions.loginUser),
      concatMap(action =>
        this.authService.signIn(action.email, action.password).pipe(
          map((user) => AuthApiActions.loginUserSuccess({ user })),
          catchError((error) => of(AuthApiActions.loginUserFailure({ error })))
        )
      )
    );
  });
}
