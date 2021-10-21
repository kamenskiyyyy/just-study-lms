import { Dispatch } from 'redux';
import { HomeworkAction, HomeworkActionTypes, IHomework } from '../reducers/homeworkReducer';
import { homeworksApi } from '../../api';

export const HomeworkActionCreators = {
  getAllHomeworks: () => async (dispatch: Dispatch<HomeworkAction>) => {
    dispatch({ type: HomeworkActionTypes.GET_INFO_HOMEWORK });
    await homeworksApi
      .getAllHomeworks()
      .then((res) => {
        dispatch({ type: HomeworkActionTypes.GET_INFO_HOMEWORK_ALL_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        dispatch({ type: HomeworkActionTypes.GET_INFO_HOMEWORK_ERROR, payload: error });
      });
  },
  getCurrentHomework: (id: number) => async (dispatch: Dispatch<HomeworkAction>) => {
    dispatch({ type: HomeworkActionTypes.GET_INFO_HOMEWORK });
    await homeworksApi
      .getCurrentHomework(id)
      .then((res) => {
        let data: IHomework[] = Array(res.data);
        dispatch({ type: HomeworkActionTypes.GET_INFO_HOMEWORK_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: HomeworkActionTypes.GET_INFO_HOMEWORK_ERROR, payload: error });
      });
  },
};
