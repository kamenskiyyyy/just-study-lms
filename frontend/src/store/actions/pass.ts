import { Dispatch } from 'redux';
import { PassAction, PassActionTypes } from '../reducers/passReducer';
import { apiService } from '../../api';
import { IUser } from '../reducers/userReducer';

export const PassActionCreators = {
  getCurrentPass: (user: IUser) => async (dispatch: Dispatch<PassAction>) => {
    try {
      dispatch({ type: PassActionTypes.GET_INFO_PASS });
      if (user.id) {
        const response = await apiService.get(`/pass?id=${user.id}`, true);
        if (response) {
          dispatch({ type: PassActionTypes.GET_INFO_PASS_SUCCESS, payload: response });
        } else {
          dispatch({ type: PassActionTypes.GET_INFO_PASS_ERROR, payload: 'Произошла ошибка при загрузке абонемента' });
        }
      }
    } catch (e) {
      dispatch({ type: PassActionTypes.GET_INFO_PASS_ERROR, payload: 'Произошла неизвестная ошибка' });
    }
  },
};
