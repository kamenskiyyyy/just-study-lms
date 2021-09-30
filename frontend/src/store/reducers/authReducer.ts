import { IUserLogin } from "../../pages/Auth/Login.page";

interface IAuthState {
  auth: any,
  isLogin: boolean,
  loading: boolean,
  error: null | string
}

const initialState: IAuthState = {
  auth: [],
  isLogin: false,
  loading: false,
  error: null
};

export enum AuthActionTypes {
  SET_AUTH = "SET_AUTH",
  SET_USER = "SET_USER",
  SET_IS_LOADING = "SET_IS_LOADING",
  SET_AUTH_ERROR = "SET_AUTH_ERROR",
  SET_AUTH_LOGOUT = "SET_AUTH_LOGOUT",
  SET_AUTH_REGISTER = 'SET_AUTH_REGISTER'
}

export interface ISetAuthAction {
  type: AuthActionTypes.SET_AUTH;
  payload: boolean;
}

export interface ISetUserAction {
  type: AuthActionTypes.SET_USER;
  payload: IUserLogin;
}

export interface ISetAuthErrorAction {
  type: AuthActionTypes.SET_AUTH_ERROR;
  payload: string;
}

export interface ISetAuthLogoutAction {
  type: AuthActionTypes.SET_AUTH_LOGOUT;
}

export interface ISetIsLoadingAction {
  type: AuthActionTypes.SET_IS_LOADING;
  payload: boolean;
}

export interface ISetAuthRegisterAction {
  type: AuthActionTypes.SET_AUTH_REGISTER;
  payload: boolean;
}

export type AuthAction =
  ISetAuthAction
  | ISetUserAction
  | ISetAuthErrorAction
  | ISetAuthLogoutAction
  | ISetIsLoadingAction
  | ISetAuthRegisterAction;

export const authReducer = (state = initialState, action: AuthAction): IAuthState => {
  switch (action.type) {
    case AuthActionTypes.SET_AUTH:
      return { ...state, isLogin: action.payload, loading: false };
    case AuthActionTypes.SET_IS_LOADING:
      return { ...state, loading: action.payload };
    case AuthActionTypes.SET_USER:
      return { ...state, loading: false, isLogin: true, auth: action.payload };
    case AuthActionTypes.SET_AUTH_ERROR:
      return { ...state, loading: false, error: action.payload };
    case AuthActionTypes.SET_AUTH_LOGOUT:
      return { ...state, isLogin: false, auth: [], loading: false };
    default:
      return state;
  }
};
