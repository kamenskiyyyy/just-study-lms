export interface ILesson {
  id: number;
  title: string;
  description: string;
  numbering: number;
  file: string[];
  body: string;
  watched: boolean;
  block: boolean;
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  homeworks: any[];
}

interface ILessonState {
  lesson: ILesson[];
  loading: boolean;
  error: null | Response;
}

export enum LessonActionTypes {
  GET_INFO_LESSON = 'GET_INFO_LESSON',
  GET_INFO_LESSON_SUCCESS = 'GET_INFO_LESSON_SUCCESS',
  GET_INFO_LESSON_ERROR = 'GET_INFO_LESSON_ERROR',
}

interface IGetLessonAction {
  type: LessonActionTypes.GET_INFO_LESSON;
}

interface IGetLessonSuccessAction {
  type: LessonActionTypes.GET_INFO_LESSON_SUCCESS;
  payload: ILesson[];
}

interface IGetLessonErrorAction {
  type: LessonActionTypes.GET_INFO_LESSON_ERROR;
  payload: Response;
}

export type LessonAction = IGetLessonAction | IGetLessonSuccessAction | IGetLessonErrorAction;

const initialState: ILessonState = {
  lesson: [] as ILesson[],
  loading: false,
  error: null,
};

export const lessonReducer = (state = initialState, action: LessonAction): ILessonState => {
  switch (action.type) {
    case LessonActionTypes.GET_INFO_LESSON:
      return { ...state, loading: true };
    case LessonActionTypes.GET_INFO_LESSON_SUCCESS:
      return { ...state, loading: false, lesson: action.payload };
    case LessonActionTypes.GET_INFO_LESSON_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
