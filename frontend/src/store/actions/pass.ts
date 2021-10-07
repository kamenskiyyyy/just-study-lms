import { Dispatch } from 'redux';
import { PassAction, PassActionTypes } from '../reducers/passReducer';
import { apiService } from '../../api';
import { IUser } from '../reducers/userReducer';

export const PassActionCreators = {
  getCurrentPass: (user: IUser) => async (dispatch: Dispatch<PassAction>) => {
    dispatch({ type: PassActionTypes.GET_INFO_PASS });
    if (user.id) {
      await apiService
        .get(`/pass?id=${user.id}`, true)
        .then((res) => {
          dispatch({ type: PassActionTypes.GET_INFO_PASS_SUCCESS, payload: res });
        })
        .catch((error) => {
          dispatch({ type: PassActionTypes.GET_INFO_PASS_ERROR, payload: error });
        });
    }
  },
};
