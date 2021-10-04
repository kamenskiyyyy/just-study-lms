import { Dispatch } from 'redux';
import { CourseAction, CourseActionTypes } from '../reducers/courseReducer';
import { apiService } from '../../api';

export const CourseActionCreators = {
  getAllCourse: () => async (dispatch: Dispatch<CourseAction>) => {
    try {
      dispatch({ type: CourseActionTypes.GET_INFO_COURSES });
      const response = await apiService.get('/courses', true);
      console.log(response);
      if (response) {
        dispatch({ type: CourseActionTypes.GET_INFO_COURSES_ALL_SUCCESS, payload: response });
      } else {
        dispatch({ type: CourseActionTypes.GET_INFO_COURSES_ERROR, payload: `Произошла ошибка при загрузке курсов` });
      }
    } catch (e) {
      dispatch({ type: CourseActionTypes.GET_INFO_COURSES_ERROR, payload: `Произошла ошибка при загрузке курсов ${e}` });
    }
  },
};
