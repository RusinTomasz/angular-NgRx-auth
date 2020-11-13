import { User } from '../../user';
/* NgRx */
import { createAction, props } from '@ngrx/store';

/* Login */

export const loginUserSuccess = createAction(
  '[Auth API] Login User Success',
  props<{ user: User }>()
);

export const loginUserFailure = createAction(
  '[Auth API] Login User Fail',
  props<{ error: string }>()
);

/* Register */

export const registerUserSuccess = createAction(
  '[Auth API] Register User Success',
  props<{ registeredUserEmail: string }>()
);

export const registerUserFailure = createAction(
  '[Auth API] Register User Fail',
  props<{ error: string }>()
);

/* Verify Account */

export const verifyAccountSuccess = createAction(
  '[Auth API] Verify Account Success'
);

export const verifyAccountFailure = createAction(
  '[Auth API] Verify Account Fail',
  props<{ error: string }>()
);

/* Forgot Password */

export const sendEmailToResetPasswordSuccess = createAction(
  '[Auth API] Send Email To Reset Password Success',
  props<{ email: string }>()
);

export const sendEmailToResetPasswordFailure = createAction(
  '[Auth API] Send Email To Reset Password Failure',
  props<{ error: string }>()
);
