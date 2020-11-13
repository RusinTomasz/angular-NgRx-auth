import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { AuthState } from './auth.reducer';

export interface State extends AppState.State {
  auth: AuthState;
}

// Selector functions
const getAuthFeatureState = createFeatureSelector<AuthState>('auth');

export const getLoginError = createSelector(
  getAuthFeatureState,
  (state) => state.errors.loginError
);

export const getRegisterUserError = createSelector(
  getAuthFeatureState,
  (state) => state.errors.registerUserError
);
export const getMailVerifyError = createSelector(
  getAuthFeatureState,
  (state) => state.errors.mailVerifyError
);

export const getResetPasswordError = createSelector(
  getAuthFeatureState,
  (state) => state.errors.resetPasswordError
);

export const getSendEmailToResetPasswordError = createSelector(
  getAuthFeatureState,
  (state) => state.errors.sendEmailToResetPasswordError
);

export const getLoadingStatus = createSelector(
  getAuthFeatureState,
  (state) => state.isLoading
);

export const getUserToken = createSelector(
  getAuthFeatureState,
  (state) => state.currentUser.token
);

export const getRegisteredUserEmail = createSelector(
  getAuthFeatureState,
  (state) => state.registeredUserEmail
);

export const getEmailToSendResetPasswordLink = createSelector(
  getAuthFeatureState,
  (state) => state.emailToSendResetPasswordLink
);

export const getPasswordHasBeenChangedFlag = createSelector(
  getAuthFeatureState,
  (state) => state.userPasswordHasBeenChanged
);
