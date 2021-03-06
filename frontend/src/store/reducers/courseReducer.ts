import { ILesson } from './lessonReducer';

export interface ICourse {
  id: number;
  title: string;
  description: string;
  category: string[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  lessons: ILesson[];
}

interface ICourseState {
  courses: ICourse[];
  course: ICourse[];
  loading: boolean;
  error: null | Response;
}

export enum CourseActionTypes {
  GET_INFO_COURSES = 'GET_ALL_COURSES',
  GET_INFO_COURSES_ALL_SUCCESS = 'GET_INFO_COURSES_ALL_SUCCESS',
  GET_INFO_COURSE_SUCCESS = 'GET_INFO_COURSE_SUCCESS',
  GET_INFO_COURSES_ERROR = 'GET_INFO_COURSES_ERROR',
}

interface IGetCourseAction {
  type: CourseActionTypes.GET_INFO_COURSES;
}

interface IGetCoursesAllSuccessAction {
  type: CourseActionTypes.GET_INFO_COURSES_ALL_SUCCESS;
  payload: ICourse[];
}

interface IGetCourseSuccessAction {
  type: CourseActionTypes.GET_INFO_COURSE_SUCCESS;
  payload: ICourse[];
}

interface IGetCourseErrorAction {
  type: CourseActionTypes.GET_INFO_COURSES_ERROR;
  payload: Response;
}

export type CourseAction =
  | IGetCourseAction
  | IGetCoursesAllSuccessAction
  | IGetCourseSuccessAction
  | IGetCourseErrorAction;

const initialState: ICourseState = {
  courses: [] as ICourse[],
  course: [] as ICourse[],
  loading: false,
  error: null,
};

export const courseReducer = (state = initialState, action: CourseAction): ICourseState => {
  switch (action.type) {
    case CourseActionTypes.GET_INFO_COURSES:
      return { ...state, loading: true };
    case CourseActionTypes.GET_INFO_COURSES_ALL_SUCCESS:
      return { ...state, loading: false, courses: action.payload };
    case CourseActionTypes.GET_INFO_COURSE_SUCCESS:
      return { ...state, loading: false, course: action.payload };
    case CourseActionTypes.GET_INFO_COURSES_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
