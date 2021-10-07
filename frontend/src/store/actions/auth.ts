import { Dispatch } from 'redux';
import {
  AuthAction,
  AuthActionTypes,
  ISetAuthAction,
  ISetAuthErrorAction,
  ISetIsLoadingAction,
  ISetUserAction,
} from '../reducers/authReducer';
import { apiService } from '../../api';
import { IUserLogin } from '../../pages/Auth/Login.page';
import { IUserRegister } from '../../pages/Auth/Register.page';

export const AuthActionCreators = {
  setUser: (user: IUserLogin): ISetUserAction => ({ type: AuthActionTypes.SET_USER, payload: user }),
  setIsAuth: (auth: boolean): ISetAuthAction => ({ type: AuthActionTypes.SET_AUTH, payload: auth }),
  setIsLoading: (payload: boolean): ISetIsLoadingAction => ({ type: AuthActionTypes.SET_IS_LOADING, payload }),
  setError: (payload: Response): ISetAuthErrorAction => ({ type: AuthActionTypes.SET_AUTH_ERROR, payload }),
  login: (userData: IUserLogin) => async (dispatch: Dispatch<AuthAction>) => {
    dispatch(AuthActionCreators.setIsLoading(true));
    await apiService
      .post('/users/signin', userData)
      .then((res) => {
        localStorage.setItem('jwt', res.data.token);
        dispatch(AuthActionCreators.setUser(res));
        dispatch(AuthActionCreators.setIsAuth(true));
      })
      .catch((error) => {
        dispatch(AuthActionCreators.setError(error));
      });
  },
  logout: () => async (dispatch: Dispatch<AuthAction>) => {
    localStorage.clear();
    dispatch(AuthActionCreators.setUser({} as IUserLogin));
    dispatch(AuthActionCreators.setIsAuth(false));
  },
  register: (userData: IUserRegister) => async (dispatch: Dispatch<AuthAction>) => {
    dispatch(AuthActionCreators.setIsLoading(true));
    await apiService
      .post('/users/create', userData)
      .then((res) => {
        localStorage.setItem('jwt', res.data.token);
        dispatch(AuthActionCreators.setUser(res));
        dispatch(AuthActionCreators.setIsAuth(true));
      })
      .catch((error) => {
        dispatch(AuthActionCreators.setError(error));
      });
  },
};
