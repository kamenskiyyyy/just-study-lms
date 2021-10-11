import { IUser } from './userReducer';
import { IHomework } from './homeworkReducer';

export interface ITask {
  id: number;
  watched: boolean;
  block: boolean;
  isPublished: boolean;
  type: 'choiceFromList' | 'writeWord';
  body: [];
  createdAt: Date;
  updatedAt: Date;
  homework: IHomework;
  student: IUser;
}

interface ITaskState {
  tasks: ITask[];
  task: ITask[];
  loading: boolean;
  error: null | Response;
}

export enum TaskActionTypes {
  GET_INFO_TASK = 'GET_INFO_TASK',
  GET_INFO_TASK_SUCCESS = 'GET_INFO_TASK_SUCCESS',
  GET_INFO_TASK_ALL_SUCCESS = 'GET_INFO_TASK_ALL_SUCCESS',
  GET_INFO_TASK_ERROR = 'GET_INFO_TASK_ERROR',
}

interface IGetTaskAction {
  type: TaskActionTypes.GET_INFO_TASK;
}

interface IGetTaskSuccessAction {
  type: TaskActionTypes.GET_INFO_TASK_SUCCESS;
  payload: ITask[];
}

interface IGetTaskAllSuccessAction {
  type: TaskActionTypes.GET_INFO_TASK_ALL_SUCCESS;
  payload: ITask[];
}

interface IGetTaskErrorAction {
  type: TaskActionTypes.GET_INFO_TASK_ERROR;
  payload: Response;
}

export type TaskAction = IGetTaskAction | IGetTaskSuccessAction | IGetTaskAllSuccessAction | IGetTaskErrorAction;

const initialState: ITaskState = {
  tasks: [] as ITask[],
  task: [] as ITask[],
  loading: false,
  error: null,
};

export const tasksReducer = (state = initialState, action: TaskAction): ITaskState => {
  switch (action.type) {
    case TaskActionTypes.GET_INFO_TASK:
      return { ...state, loading: true };
    case TaskActionTypes.GET_INFO_TASK_ALL_SUCCESS:
      return { ...state, loading: false, tasks: action.payload };
    case TaskActionTypes.GET_INFO_TASK_SUCCESS:
      return { ...state, loading: false, task: action.payload };
    case TaskActionTypes.GET_INFO_TASK_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
