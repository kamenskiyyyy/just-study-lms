import * as UserActionCreators from "./user";
import { AuthActionCreators } from "./auth";
import { CourseActionCreators } from "./course";

export const allActionCreators = {
  ...AuthActionCreators,
  ...UserActionCreators,
  ...CourseActionCreators
};
