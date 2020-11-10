import { User } from '../../user';
/* NgRx */
import { createAction, props } from '@ngrx/store';

export const loginUserSuccess = createAction(
  '[Auth API] Login User Success',
  props<{ user: User }>()
);

export const loginUserFailure = createAction(
  '[Auth API] Login User Fail',
  props<{ error: string }>()
);
