interface ICourse {
  id: number;
  title: string;
  description: string;
  category: string[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  lessons: any;
}

interface ICourseState {
  courses: ICourse[];
  currentCourse: ICourse;
  loading: boolean;
  error: null | string;
}

export enum CourseActionTypes {
  GET_INFO_COURSES = 'GET_ALL_COURSES',
  GET_INFO_COURSES_ALL_SUCCESS = 'GET_INFO_COURSES_ALL_SUCCESS',
  GET_INFO_COURSES_ERROR = 'GET_INFO_COURSES_ERROR',
  GET_INFO_COURSES_FOR_USER = 'GET_INFO_COURSES_FOR_USER',
}

interface IGetCourseAction {
  type: CourseActionTypes.GET_INFO_COURSES;
}

interface IGetCourseSuccessAction {
  type: CourseActionTypes.GET_INFO_COURSES_ALL_SUCCESS;
  payload: ICourse[];
}

interface IGetCourseErrorAction {
  type: CourseActionTypes.GET_INFO_COURSES_ERROR;
  payload: string;
}

interface IGetCourseForUserAction {
  type: CourseActionTypes.GET_INFO_COURSES_FOR_USER;
  payload: ICourse;
}

export type CourseAction = IGetCourseAction | IGetCourseSuccessAction | IGetCourseErrorAction |IGetCourseForUserAction;

const initialState: ICourseState = {
  courses: [] as unknown as ICourse[],
  currentCourse: [] as unknown as ICourse,
  loading: false,
  error: null,
};

export const courseReducer = (state = initialState, action: CourseAction): ICourseState => {
  switch (action.type) {
    case CourseActionTypes.GET_INFO_COURSES:
      return { ...state, loading: true };
    case CourseActionTypes.GET_INFO_COURSES_ALL_SUCCESS:
      return { ...state, loading: false, courses: action.payload };
    case CourseActionTypes.GET_INFO_COURSES_ERROR:
      return { ...state, loading: false, error: action.payload };
    case CourseActionTypes.GET_INFO_COURSES_FOR_USER:
      return {...state, loading: false, currentCourse: action.payload}
    default:
      return state;
  }
};
