import { Dispatch } from 'redux';
import { ILesson, LessonAction, LessonActionTypes } from '../reducers/lessonReducer';
import { apiService } from '../../api';

export const LessonActionCreators = {
  getCurrentLesson: (id: number) => async (dispatch: Dispatch<LessonAction>) => {
    dispatch({ type: LessonActionTypes.GET_INFO_LESSON });
    await apiService
      .get(`/lessons/lesson?id=${id}`, true)
      .then((res) => {
        let data: ILesson[] = Array(res);
        dispatch({ type: LessonActionTypes.GET_INFO_LESSON_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: LessonActionTypes.GET_INFO_LESSON_ERROR, payload: error });
      });
  },
};
