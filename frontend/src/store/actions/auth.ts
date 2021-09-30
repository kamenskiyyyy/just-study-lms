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
  setError: (payload: string): ISetAuthErrorAction => ({ type: AuthActionTypes.SET_AUTH_ERROR, payload }),
  login: (userData: IUserLogin) => async (dispatch: Dispatch<AuthAction>) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true));
      const response = await apiService.post('/users/signin', userData);
      if (response) {
        localStorage.setItem('jwt', response.data.token);
        dispatch(AuthActionCreators.setUser(response));
        dispatch(AuthActionCreators.setIsAuth(true));
      } else {
        dispatch(AuthActionCreators.setError('Некорректный логин или пароль'));
      }
      dispatch(AuthActionCreators.setIsLoading(false));
    } catch (e) {
      dispatch(AuthActionCreators.setError('Произошла ошибка при логине'));
    }
  },
  logout: () => async (dispatch: Dispatch<AuthAction>) => {
    localStorage.clear();
    dispatch(AuthActionCreators.setUser({} as IUserLogin));
    dispatch(AuthActionCreators.setIsAuth(false));
  },
  register: (userData: IUserRegister) => async (dispatch: Dispatch<AuthAction>) => {
    try {
      dispatch(AuthActionCreators.setIsLoading(true));
      const response = await apiService.post('/users/create', userData);
      if (response) {
        localStorage.setItem('jwt', response.data.token);
        dispatch(AuthActionCreators.setUser(response));
        dispatch(AuthActionCreators.setIsAuth(true));
      } else {
        dispatch(AuthActionCreators.setError('Произошла ошибка при регистрации'));
      }
      dispatch(AuthActionCreators.setIsLoading(false));
    } catch (e) {
      dispatch(AuthActionCreators.setError('Произошла ошибка при регистрации'));
    }
  },
};
