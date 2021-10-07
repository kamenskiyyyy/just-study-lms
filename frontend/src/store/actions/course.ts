import { Dispatch } from 'redux';
import { CourseAction, CourseActionTypes, ICourse } from '../reducers/courseReducer';
import { apiService } from '../../api';

export const CourseActionCreators = {
  getAllCourses: () => async (dispatch: Dispatch<CourseAction>) => {
    dispatch({ type: CourseActionTypes.GET_INFO_COURSES });
    await apiService
      .get('/courses', true)
      .then((res) => {
        dispatch({ type: CourseActionTypes.GET_INFO_COURSES_ALL_SUCCESS, payload: res });
      })
      .catch((error) => {
        dispatch({ type: CourseActionTypes.GET_INFO_COURSES_ERROR, payload: error });
      });
  },
  getCurrentCourse: (id: number) => async (dispatch: Dispatch<CourseAction>) => {
    dispatch({ type: CourseActionTypes.GET_INFO_COURSES });
    await apiService
      .get(`/courses/course?id=${id}`, true)
      .then((res) => {
        let data: ICourse[] = Array(res);
        dispatch({ type: CourseActionTypes.GET_INFO_COURSE_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: CourseActionTypes.GET_INFO_COURSES_ERROR, payload: error });
      });
  },
};
