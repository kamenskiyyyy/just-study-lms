import * as UserActionCreators from "./user";
import { AuthActionCreators } from "./auth";

export const allActionCreators = {
  ...AuthActionCreators,
  ...UserActionCreators
};
