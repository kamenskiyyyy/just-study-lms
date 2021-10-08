import * as UserActionCreators from './user';
import { AuthActionCreators } from './auth';
import { CourseActionCreators } from './course';
import { PassActionCreators } from './pass';
import { LessonActionCreators } from './lesson';
import { HomeworkActionCreators } from './homework';

export const allActionCreators = {
  ...AuthActionCreators,
  ...UserActionCreators,
  ...CourseActionCreators,
  ...PassActionCreators,
  ...LessonActionCreators,
  ...HomeworkActionCreators,
};
