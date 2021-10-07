import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { authReducer } from './authReducer';
import { courseReducer } from './courseReducer';
import { passReducer } from './passReducer';
import { lessonReducer } from './lessonReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  courses: courseReducer,
  pass: passReducer,
  lesson: lessonReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
