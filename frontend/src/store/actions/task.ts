import { Dispatch } from 'redux';
import { ITask, TaskAction, TaskActionTypes } from '../reducers/tasksRecucer';
import { tasksApi } from '../../api';

export const TaskActionCreators = {
  getAllTasks: () => async (dispatch: Dispatch<TaskAction>) => {
    dispatch({ type: TaskActionTypes.GET_INFO_TASK });
    await tasksApi
      .getAllTasks()
      .then((res) => {
        dispatch({ type: TaskActionTypes.GET_INFO_TASK_ALL_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        dispatch({ type: TaskActionTypes.GET_INFO_TASK_ERROR, payload: error });
      });
  },
  getAllTaskUser: (userId: number) => async (dispatch: Dispatch<TaskAction>) => {
    dispatch({ type: TaskActionTypes.GET_INFO_TASK });
    await tasksApi
      .getAllTaskUser(userId)
      .then((res) => {
        dispatch({ type: TaskActionTypes.GET_INFO_TASK_ALL_SUCCESS, payload: res.data });
      })
      .catch((error) => {
        dispatch({ type: TaskActionTypes.GET_INFO_TASK_ERROR, payload: error });
      });
  },
  getCurrentTask: (taskId: number) => async (dispatch: Dispatch<TaskAction>) => {
    dispatch({ type: TaskActionTypes.GET_INFO_TASK });
    await tasksApi
      .getCurrentTask(taskId)
      .then((res) => {
        let data: ITask[] = Array(res.data);
        dispatch({ type: TaskActionTypes.GET_INFO_TASK_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: TaskActionTypes.GET_INFO_TASK_ERROR, payload: error });
      });
  },
  postDoneTask: (homeworkId: number, userId: number, taskData: ITask) => async (dispatch: Dispatch<TaskAction>) => {
    dispatch({ type: TaskActionTypes.GET_INFO_TASK });
    await tasksApi
      .postDoneTask(homeworkId, userId, taskData)
      .then((res) => {
        let data: ITask[] = Array(res.data);
        dispatch({ type: TaskActionTypes.GET_INFO_TASK_SUCCESS, payload: data });
      })
      .catch((error) => {
        dispatch({ type: TaskActionTypes.GET_INFO_TASK_ERROR, payload: error });
      });
  },
};
