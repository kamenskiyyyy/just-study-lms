import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { authReducer } from "./authReducer";
import { courseReducer } from "./courseReducer";
import { passReducer } from "./passReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  courses: courseReducer,
  pass: passReducer
})

export type RootState = ReturnType<typeof rootReducer>
