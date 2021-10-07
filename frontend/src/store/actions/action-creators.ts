import * as UserActionCreators from './user';
import { AuthActionCreators } from './auth';
import { CourseActionCreators } from './course';
import { PassActionCreators } from './pass';
import { LessonActionCreators } from './lesson';

export const allActionCreators = {
  ...AuthActionCreators,
  ...UserActionCreators,
  ...CourseActionCreators,
  ...PassActionCreators,
  ...LessonActionCreators,
};
