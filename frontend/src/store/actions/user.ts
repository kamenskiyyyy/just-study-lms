import { UserAction, UserActionTypes } from "../reducers/userReducer";
import { Dispatch } from "redux";
import { apiService } from "../../api";

export const getUserInfo = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.GET_INFO_CURRENT_USER });
      const response = await apiService.get("/users/me", true);
      dispatch({ type: UserActionTypes.GET_INFO_CURRENT_USER_SUCCESS, payload: response.data });
    } catch (e) {
      dispatch({ type: UserActionTypes.GET_INFO_CURRENT_USER_ERROR, payload: "Произошла ошибка" });
    }
  };
};
