interface IUser {
  id: number;
  email: string;
  password: string;
  type: 'admin' | 'user' | 'teacher' | 'manager';
  firstName: string;
  secondName: string;
  birthDate: Date;
  phone: number;
  telegram: string;
  status: boolean;
}

interface IUserState {
  user: IUser;
  loading: boolean;
  error: null | string;
}

export enum UserActionTypes {
  GET_INFO_CURRENT_USER = 'GET_INFO_CURRENT_USER',
  GET_INFO_CURRENT_USER_SUCCESS = 'GET_INFO_CURRENT_USER_SUCCESS',
  GET_INFO_CURRENT_USER_ERROR = 'GET_INFO_CURRENT_USER_ERROR',
}

interface IGetUserAction {
  type: UserActionTypes.GET_INFO_CURRENT_USER;
}

interface IGetUserSuccessAction {
  type: UserActionTypes.GET_INFO_CURRENT_USER_SUCCESS;
  payload: IUser;
}

interface IGetUserErrorAction {
  type: UserActionTypes.GET_INFO_CURRENT_USER_ERROR;
  payload: string;
}

export type UserAction = IGetUserAction | IGetUserSuccessAction | IGetUserErrorAction;

const initialState: IUserState = {
  user: [] as unknown as IUser,
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action: UserAction): IUserState => {
  switch (action.type) {
    case UserActionTypes.GET_INFO_CURRENT_USER:
      return { ...state, loading: true };
    case UserActionTypes.GET_INFO_CURRENT_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case UserActionTypes.GET_INFO_CURRENT_USER_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
