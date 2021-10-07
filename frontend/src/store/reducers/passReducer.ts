import { ICourse } from './courseReducer';
import { IUser } from './userReducer';

export interface IPass {
  id: number;
  label: string;
  status: boolean;
  paid: boolean;
  comment: string;
  type: 'economy' | 'business' | 'first' | 'standard' | 'premium' | 'vip' | 'speaking';
  createdAt: Date;
  updatedAt: Date;
  course: ICourse;
  owner: IUser;
}

interface IPassState {
  pass: IPass[];
  loading: boolean;
  error: null | Response;
}

export enum PassActionTypes {
  GET_INFO_PASS = 'GET_INFO_PASS',
  GET_INFO_PASS_SUCCESS = 'GET_INFO_PASS_SUCCESS',
  GET_INFO_PASS_ERROR = 'GET_INFO_PASS_ERROR',
}

interface IGetPassAction {
  type: PassActionTypes.GET_INFO_PASS;
}

interface IGetPassSuccessAction {
  type: PassActionTypes.GET_INFO_PASS_SUCCESS;
  payload: IPass[];
}

interface IGetPassErrorAction {
  type: PassActionTypes.GET_INFO_PASS_ERROR;
  payload: Response;
}

export type PassAction = IGetPassAction | IGetPassSuccessAction | IGetPassErrorAction;

const initialState: IPassState = {
  pass: [] as IPass[],
  loading: false,
  error: null,
};

export const passReducer = (state = initialState, action: PassAction): IPassState => {
  switch (action.type) {
    case PassActionTypes.GET_INFO_PASS:
      return { ...state, loading: true };
    case PassActionTypes.GET_INFO_PASS_SUCCESS:
      return { ...state, loading: false, pass: action.payload };
    case PassActionTypes.GET_INFO_PASS_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
