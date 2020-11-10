import { User } from './../../user';
/* NgRx */
import { createAction, props } from '@ngrx/store';

/* Login */

export const loginUser = createAction(
  '[Auth Page] Login User',
  props<{ email: string; password: string }>()
);

export const logoutUser = createAction('[Auth Page] Logout User');

export const autoLogin = createAction(
  '[Auth Page] Auto Login',
  props<{ userData: User }>()
);

/* Register */

export const registerUser = createAction(
  '[Auth Page] Register User',
  props<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
  }>()
);
