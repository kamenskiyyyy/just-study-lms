import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { authReducer } from "./authReducer";
import { courseReducer } from "./courseReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  courses: courseReducer
})

export type RootState = ReturnType<typeof rootReducer>
