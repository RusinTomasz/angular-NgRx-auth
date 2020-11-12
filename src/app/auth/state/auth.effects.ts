import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

/* Services */
import { AuthService, RegisterInterface } from './../auth.service';

/* RxJs */
import { map, catchError, concatMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

/* NgRx */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthPageActions, AuthApiActions } from './actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  loginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthPageActions.loginUser),
      concatMap((action) =>
        this.authService.signIn(action.email, action.password).pipe(
          map((user) => AuthApiActions.loginUserSuccess({ user })),
          tap(() => this.router.navigate(['/'])),
          catchError((error) => of(AuthApiActions.loginUserFailure({ error })))
        )
      )
    );
  });

  registerUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthPageActions.registerUser),
      concatMap((action) =>
        this.authService
          .signUp(
            action.firstName,
            action.lastName,
            action.email,
            action.password,
            action.phoneNumber
          )
          .pipe(
            map((registeredUser: RegisterInterface) =>
              AuthApiActions.registerUserSuccess({
                registeredUserEmail: action.email,
              })
            ),
            tap(() => this.router.navigate(['/mail-confirm'])),
            catchError((error) =>
              of(AuthApiActions.registerUserFailure({ error }))
            )
          )
      )
    );
  });

  verifyAccount$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthPageActions.verifyAccount),
      concatMap(() =>
        this.authService.verifyAccount().pipe(
          map(() => AuthApiActions.verifyAccountSuccess()),
          catchError((error) =>
            of(AuthApiActions.verifyAccountFailure({ error }))
          )
        )
      )
    );
  });
}
