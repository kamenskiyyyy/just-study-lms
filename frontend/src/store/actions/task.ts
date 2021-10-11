import { Dispatch } from 'redux';
import { ITask, TaskAction, TaskActionTypes } from '../reducers/tasksRecucer';
import { apiService } from '../../api';

export const TaskActionCreators = {
  getAllTasks: () => async (dispatch: Dispatch<TaskAction>) => {
    dispatch({ type: TaskActionTypes.GET_INFO_TASK });
    await apiService
      .get('/tasks/all', true)
      .then((res) => {
        dispatch({ type: TaskActionTypes.GET_INFO_TASK_ALL_SUCCESS, payload: res });
      })
      .catch((error) => {
        dispatch({ type: TaskActionTypes.GET_INFO_TASK_ERROR, payload: error });
      });
  },
  getAllTaskUser: (userId: number) => async (dispatch: Dispatch<TaskAction>) => {
    dispatch({ type: TaskActionTypes.GET_INFO_TASK });
    await apiService
      .get(`tasks/user?id=${userId}`)
      .then((res) => {
        dispatch({ type: TaskActionTypes.GET_INFO_TASK_ALL_SUCCESS, payload: res });
      })
      .catch((error) => {
        dispatch({ type: TaskActionTypes.GET_INFO_TASK_ERROR, payload: error });
      });
  },
  getCurrentTask: (taskId: number) => async (dispatch: Dispatch<TaskAction>) => {
    dispatch({ type: TaskActionTypes.GET_INFO_TASK });
    await apiService
      .get(`/tasks?id=${taskId}`, true)
      .then((res) => {
        let data: ITask[] = Array(res);
        dispatch({ type: TaskActionTypes.GET_INFO_TASK_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: TaskActionTypes.GET_INFO_TASK_ERROR, payload: error });
      });
  },
  postDoneTask: (homeworkId: number, userId: number, taskData: ITask) => async (dispatch: Dispatch<TaskAction>) => {
    dispatch({ type: TaskActionTypes.GET_INFO_TASK });
    await apiService
      .post(`/tasks?homework-id=${homeworkId}&user-id=${userId}`, taskData, true)
      .then((res) => {
        let data: ITask[] = Array(res);
        dispatch({ type: TaskActionTypes.GET_INFO_TASK_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: TaskActionTypes.GET_INFO_TASK_ERROR, payload: error });
      });
  },
};
