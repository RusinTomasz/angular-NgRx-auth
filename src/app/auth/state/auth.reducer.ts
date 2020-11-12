import { autoLogin } from './actions/auth-page.actions';
import { User, RegisteredUser } from './../user';
/* NgRx */
import { createReducer, on } from '@ngrx/store';
import { AuthApiActions, AuthPageActions } from './actions';

// State for this feature (Auth)
export interface AuthState {
  currentUser: User;
  registeredUserEmail: string;
  error: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  currentUser: {
    firstName: null,
    lastName: null,
    email: null,
    token: null,
    userId: null,
    role: null,
  },
  registeredUserEmail: null,
  error: '',
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
        error: '',
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
        error: '',
        isLoading: false,
      };
    }
  ),
  on(
    AuthApiActions.loginUserFailure,
    (state, action): AuthState => {
      return {
        ...state,
        error: action.error,
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
        error: action.error,
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
        error: '',
        isLoading: false,
      };
    }
  ),
  on(
    AuthApiActions.verifyAccountFailure,
    (state, action): AuthState => {
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    }
  )
);
