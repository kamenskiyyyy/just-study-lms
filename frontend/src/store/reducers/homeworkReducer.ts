export interface IHomework {
  id: number;
  title: string;
  description: string;
  prompt: string;
  done: boolean;
  body: string;
  watched: boolean;
  block: boolean;
  isPublished: boolean;
}

interface IHomeworkState {
  homeworks: IHomework[];
  homework: IHomework[];
  loading: boolean;
  error: null | Response;
}

export enum HomeworkActionTypes {
  GET_INFO_HOMEWORK = 'GET_INFO_HOMEWORK',
  GET_INFO_HOMEWORK_SUCCESS = 'GET_INFO_HOMEWORK_SUCCESS',
  GET_INFO_HOMEWORK_ALL_SUCCESS = 'GET_INFO_HOMEWORK_ALL_SUCCESS',
  GET_INFO_HOMEWORK_ERROR = 'GET_INFO_HOMEWORK_ERROR',
}

interface IGetHomeworkAction {
  type: HomeworkActionTypes.GET_INFO_HOMEWORK;
}

interface IGetHomeworkSuccessAction {
  type: HomeworkActionTypes.GET_INFO_HOMEWORK_SUCCESS;
  payload: IHomework[];
}

interface IGetHomeworksAllSuccessAction {
  type: HomeworkActionTypes.GET_INFO_HOMEWORK_ALL_SUCCESS;
  payload: IHomework[];
}

interface IGetHomeworkErrorAction {
  type: HomeworkActionTypes.GET_INFO_HOMEWORK_ERROR;
  payload: Response;
}

export type HomeworkAction =
  | IGetHomeworkAction
  | IGetHomeworkSuccessAction
  | IGetHomeworksAllSuccessAction
  | IGetHomeworkErrorAction;

const initialState: IHomeworkState = {
  homeworks: [] as IHomework[],
  homework: [] as IHomework[],
  loading: false,
  error: null,
};

export const homeworkReducer = (state = initialState, action: HomeworkAction): IHomeworkState => {
  switch (action.type) {
    case HomeworkActionTypes.GET_INFO_HOMEWORK:
      return { ...state, loading: true };
    case HomeworkActionTypes.GET_INFO_HOMEWORK_ALL_SUCCESS:
      return { ...state, loading: false, homeworks: action.payload };
    case HomeworkActionTypes.GET_INFO_HOMEWORK_SUCCESS:
      return { ...state, loading: false, homework: action.payload };
    case HomeworkActionTypes.GET_INFO_HOMEWORK_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
