import { autoLogin } from './actions/auth-page.actions';
import { User, RegisteredUser } from './../user';
/* NgRx */
import { createReducer, on } from '@ngrx/store';
import { AuthApiActions, AuthPageActions } from './actions';
import { ErrorStateMatcher } from '@angular/material/core';

// State for this feature (Auth)
export interface AuthState {
  currentUser: User;
  registeredUserEmail: string | null;
  emailToSendResetPasswordLink: string | null;
  userPasswordHasBeenChanged: boolean;
  errors?: {
    sendEmailToResetPasswordError?: string | null;
    resetPasswordError?: string | null;
    loginError?: string | null;
    registerUserError?: string | null;
    mailVerifyError?: string | null;
  };
  // error: string | null;
  isLoading: boolean;
}

//sendEmailToResetPasswordError / loginError / registerUserError / resetPasswordError / mailVerifyError /

const initialState: AuthState = {
  currentUser: {
    firstName: null,
    lastName: null,
    email: null,
    token: null,
    userId: null,
    role: null,
  },
  errors: {
    sendEmailToResetPasswordError: '',
    resetPasswordError: '',
    loginError: '',
    registerUserError: '',
    mailVerifyError: '',
  },
  registeredUserEmail: null,
  emailToSendResetPasswordLink: null,
  userPasswordHasBeenChanged: false,
  isLoading: false,
};

export const authReducer = createReducer<AuthState>(
  initialState,
  on(
    AuthPageActions.autoLogin,
    (state, action): AuthState => {
      return {
        ...state,
        currentUser: {
          firstName: action.userData.firstName,
          lastName: action.userData.lastName,
          email: action.userData.email,
          token: action.userData.token,
          userId: action.userData.userId,
          role: action.userData.role,
        },
      };
    }
  ),
  on(
    AuthPageActions.loginUser,
    (state): AuthState => {
      return {
        ...state,
        isLoading: true,
      };
    }
  ),
  on(
    AuthPageActions.logoutUser,
    (state): AuthState => {
      return {
        ...state,
        currentUser: {
          firstName: null,
          lastName: null,
          email: null,
          token: null,
          userId: null,
          role: null,
        },
        errors: { ...state.errors, loginError: '' },
        isLoading: false,
      };
    }
  ),
  on(
    AuthApiActions.loginUserSuccess,
    (state, action): AuthState => {
      return {
        ...state,
        currentUser: {
          firstName: action.user.firstName,
          lastName: action.user.lastName,
          email: action.user.email,
          token: action.user.token,
          userId: action.user.userId,
          role: action.user.role,
        },
        errors: { ...state.errors, loginError: '' },
        isLoading: false,
      };
    }
  ),
  on(
    AuthApiActions.loginUserFailure,
    (state, action): AuthState => {
      return {
        ...state,
        errors: { ...state.errors, loginError: action.error },
        isLoading: false,
      };
    }
  ),
  on(
    AuthPageActions.registerUser,
    (state): AuthState => {
      return {
        ...state,
        isLoading: true,
      };
    }
  ),
  on(
    AuthApiActions.registerUserSuccess,
    (state, action): AuthState => {
      return {
        ...state,
        errors: { ...state.errors, registerUserError: '' },
        registeredUserEmail: action.registeredUserEmail,
        isLoading: false,
      };
    }
  ),
  on(
    AuthApiActions.registerUserFailure,
    (state, action): AuthState => {
      return {
        ...state,
        errors: { ...state.errors, registerUserError: action.error },
        isLoading: false,
      };
    }
  ),
  on(
    AuthPageActions.verifyAccount,
    (state): AuthState => {
      return {
        ...state,
        isLoading: true,
      };
    }
  ),
  on(
    AuthApiActions.verifyAccountSuccess,
    (state): AuthState => {
      return {
        ...state,
        errors: { ...state.errors, mailVerifyError: '' },
        isLoading: false,
      };
    }
  ),
  on(
    AuthApiActions.verifyAccountFailure,
    (state, action): AuthState => {
      return {
        ...state,
        errors: { ...state.errors, mailVerifyError: action.error },
        isLoading: false,
      };
    }
  ),
  on(
    AuthPageActions.sendEmailToResetPassword,
    (state): AuthState => {
      return {
        ...state,
        isLoading: true,
      };
    }
  ),
  on(
    AuthApiActions.sendEmailToResetPasswordSuccess,
    (state, action): AuthState => {
      return {
        ...state,
        errors: { ...state.errors, sendEmailToResetPasswordError: '' },
        emailToSendResetPasswordLink: action.email,
        isLoading: false,
      };
    }
  ),
  on(
    AuthApiActions.sendEmailToResetPasswordFailure,
    (state, action): AuthState => {
      return {
        ...state,
        errors: {
          ...state.errors,
          sendEmailToResetPasswordError: action.error,
        },
        isLoading: false,
      };
    }
  ),
  on(
    AuthPageActions.resetPassword,
    (state): AuthState => {
      return {
        ...state,
        isLoading: true,
      };
    }
  ),
  on(
    AuthApiActions.resetPasswordSuccess,
    (state): AuthState => {
      return {
        ...state,
        errors: { ...state.errors, resetPasswordError: '' },
        userPasswordHasBeenChanged: true,
        isLoading: false,
      };
    }
  ),
  on(
    AuthApiActions.resetPasswordFailure,
    (state, action): AuthState => {
      return {
        ...state,
        errors: { ...state.errors, resetPasswordError: action.error },
        isLoading: false,
      };
    }
  )
);
