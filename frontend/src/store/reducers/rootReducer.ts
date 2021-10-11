import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { authReducer } from './authReducer';
import { courseReducer } from './courseReducer';
import { passReducer } from './passReducer';
import { lessonReducer } from './lessonReducer';
import { homeworkReducer } from './homeworkReducer';
import { tasksReducer } from './tasksRecucer';

export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  courses: courseReducer,
  pass: passReducer,
  lesson: lessonReducer,
  homework: homeworkReducer,
  task: tasksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
