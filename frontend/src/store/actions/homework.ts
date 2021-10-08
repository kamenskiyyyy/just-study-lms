import { Dispatch } from 'redux';
import { HomeworkAction, HomeworkActionTypes, IHomework } from '../reducers/homeworkReducer';
import { apiService } from '../../api';

export const HomeworkActionCreators = {
  getAllHomeworks: () => async (dispatch: Dispatch<HomeworkAction>) => {
    dispatch({ type: HomeworkActionTypes.GET_INFO_HOMEWORK });
    await apiService
      .get(`/homeworks/all`, true)
      .then((res) => {
        dispatch({ type: HomeworkActionTypes.GET_INFO_HOMEWORK_ALL_SUCCESS, payload: res });
      })
      .catch((error) => {
        dispatch({ type: HomeworkActionTypes.GET_INFO_HOMEWORK_ERROR, payload: error });
      });
  },
  getCurrentHomework: (id: number) => async (dispatch: Dispatch<HomeworkAction>) => {
    dispatch({ type: HomeworkActionTypes.GET_INFO_HOMEWORK });
    await apiService
      .get(`/homeworks/homework?id=${id}`, true)
      .then((res) => {
        let data: IHomework[] = Array(res);
        dispatch({ type: HomeworkActionTypes.GET_INFO_HOMEWORK_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: HomeworkActionTypes.GET_INFO_HOMEWORK_ERROR, payload: error });
      });
  },
};
