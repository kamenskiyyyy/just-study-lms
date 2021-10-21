import { Dispatch } from 'redux';
import { CourseAction, CourseActionTypes, ICourse } from '../reducers/courseReducer';
import { coursesApi } from '../../api';

export const CourseActionCreators = {
  getAllCourses: () => async (dispatch: Dispatch<CourseAction>) => {
    dispatch({ type: CourseActionTypes.GET_INFO_COURSES });
    await coursesApi
      .getAllCourses()
      .then((res) => {
        dispatch({ type: CourseActionTypes.GET_INFO_COURSES_ALL_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        dispatch({ type: CourseActionTypes.GET_INFO_COURSES_ERROR, payload: error });
      });
  },
  getCurrentCourse: (id: number) => async (dispatch: Dispatch<CourseAction>) => {
    dispatch({ type: CourseActionTypes.GET_INFO_COURSES });
    await coursesApi
      .getCurrentCourse(id)
      .then((res) => {
        let data: ICourse[] = Array(res.data);
        dispatch({ type: CourseActionTypes.GET_INFO_COURSE_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: CourseActionTypes.GET_INFO_COURSES_ERROR, payload: error });
      });
  },
};
