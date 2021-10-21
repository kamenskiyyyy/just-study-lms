import { UserAction, UserActionTypes } from '../reducers/userReducer';
import { Dispatch } from 'redux';
import { usersApi } from '../../api';

export const getUserInfo = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    dispatch({ type: UserActionTypes.GET_INFO_CURRENT_USER });
    await usersApi
      .getUser()
      .then((res) => {
        dispatch({ type: UserActionTypes.GET_INFO_CURRENT_USER_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        dispatch({ type: UserActionTypes.GET_INFO_CURRENT_USER_ERROR, payload: error });
      });
  };
};
