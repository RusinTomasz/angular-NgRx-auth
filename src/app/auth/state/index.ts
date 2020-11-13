import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../state/app.state';
import { AuthState } from './auth.reducer';

export interface State extends AppState.State {
  auth: AuthState;
}

// Selector functions
const getAuthFeatureState = createFeatureSelector<AuthState>('auth');

export const getError = createSelector(
  getAuthFeatureState,
  (state) => state.error
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
