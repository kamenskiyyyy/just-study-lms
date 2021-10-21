import { Dispatch } from 'redux';
import { PassAction, PassActionTypes } from '../reducers/passReducer';
import { passApi } from '../../api';
import { IUser } from '../reducers/userReducer';

export const PassActionCreators = {
  getCurrentPass: (user: IUser) => async (dispatch: Dispatch<PassAction>) => {
    dispatch({ type: PassActionTypes.GET_INFO_PASS });
    if (user.id) {
      await passApi
        .getCurrentPass(user.id)
        .then((res) => {
          dispatch({ type: PassActionTypes.GET_INFO_PASS_SUCCESS, payload: res.data });
        })
        .catch((error) => {
          dispatch({ type: PassActionTypes.GET_INFO_PASS_ERROR, payload: error });
        });
    }
  },
};
