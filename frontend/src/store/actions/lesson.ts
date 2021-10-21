import { Dispatch } from 'redux';
import { ILesson, LessonAction, LessonActionTypes } from '../reducers/lessonReducer';
import { lessonsApi } from '../../api';

export const LessonActionCreators = {
  getCurrentLesson: (id: number) => async (dispatch: Dispatch<LessonAction>) => {
    dispatch({ type: LessonActionTypes.GET_INFO_LESSON });
    await lessonsApi
      .getCurrentLesson(id)
      .then((res) => {
        let data: ILesson[] = Array(res.data);
        dispatch({ type: LessonActionTypes.GET_INFO_LESSON_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: LessonActionTypes.GET_INFO_LESSON_ERROR, payload: error });
      });
  },
};
