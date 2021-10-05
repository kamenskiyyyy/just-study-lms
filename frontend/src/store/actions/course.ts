import { Dispatch } from 'redux';
import { CourseAction, CourseActionTypes, ICourse } from "../reducers/courseReducer";
import { apiService } from '../../api';

export const CourseActionCreators = {
  getAllCourses: () => async (dispatch: Dispatch<CourseAction>) => {
    try {
      dispatch({ type: CourseActionTypes.GET_INFO_COURSES });
      const response = await apiService.get('/courses', true);
      if (response) {
        dispatch({ type: CourseActionTypes.GET_INFO_COURSES_ALL_SUCCESS, payload: response });
      } else {
        dispatch({ type: CourseActionTypes.GET_INFO_COURSES_ERROR, payload: `Произошла ошибка при загрузке курсов` });
      }
    } catch (e) {
      dispatch({
        type: CourseActionTypes.GET_INFO_COURSES_ERROR,
        payload: `Произошла ошибка при загрузке курсов ${e}`,
      });
    }
  },
  getCurrentCourse: (id: number) => async (dispatch: Dispatch<CourseAction>) => {
    try {
      dispatch({ type: CourseActionTypes.GET_INFO_COURSES });
      const response = await apiService.get(`/courses/course?id=${id}`, true);
      if (response) {
        let data: ICourse[] = Array(response)
        dispatch({ type: CourseActionTypes.GET_INFO_COURSE_SUCCESS, payload: data });
      } else {
        dispatch({ type: CourseActionTypes.GET_INFO_COURSES_ERROR, payload: `Произошла ошибка при загрузке курса` });
      }
    } catch (e) {
      dispatch({
        type: CourseActionTypes.GET_INFO_COURSES_ERROR,
        payload: `Произошла ошибка при загрузке курса ${e}`,
      });
    }
  },
};
