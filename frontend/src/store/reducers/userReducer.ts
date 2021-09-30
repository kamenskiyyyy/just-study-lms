interface IUserState {
  user: any,
  loading: boolean,
  error: null | string
}

export enum UserActionTypes {
  GET_INFO_CURRENT_USER = "GET_INFO_CURRENT_USER",
  GET_INFO_CURRENT_USER_SUCCESS = "GET_INFO_CURRENT_USER_SUCCESS",
  GET_INFO_CURRENT_USER_ERROR = "GET_INFO_CURRENT_USER_ERROR"
}

interface IGetUserAction {
  type: UserActionTypes.GET_INFO_CURRENT_USER;
}

interface IGetUserSuccessAction {
  type: UserActionTypes.GET_INFO_CURRENT_USER_SUCCESS;
  payload: any[];
}

interface IGetUserErrorAction {
  type: UserActionTypes.GET_INFO_CURRENT_USER_ERROR;
  payload: string;
}

export type UserAction = IGetUserAction | IGetUserSuccessAction | IGetUserErrorAction;

const initialState: IUserState = {
  user: [],
  loading: false,
  error: null
};

export const userReducer = (state = initialState, action: UserAction): IUserState => {
  switch (action.type) {
    case UserActionTypes.GET_INFO_CURRENT_USER:
      return { ...state, loading: true };
    case UserActionTypes.GET_INFO_CURRENT_USER_SUCCESS:
      return { loading: false, error: null, user: action.payload };
    case UserActionTypes.GET_INFO_CURRENT_USER_ERROR:
      return { loading: false, error: action.payload, user: [] };
    default:
      return state;
  }
};
