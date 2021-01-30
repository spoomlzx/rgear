import {IAction} from "../types";
import {Reducer} from "redux";
import {getToken, removeToken, setToken} from "../../utils/token";

export interface UserState {
  token: string;
  username: string;
  role: string;
}

const defaultUser: UserState = {
  token: getToken(),
  username: "sp",
  role: ""
}

const SET_USER_INFO = 'SET_USER_INFO';
const SET_USER_LOGOUT = 'SET_USER_LOGOUT';

export const setUserInfo: (user: UserState) => IAction<UserState> = (user: UserState) => ({
  type: SET_USER_INFO,
  payload: user
})

export const logout: () => IAction<null> = () => ({
  type: SET_USER_LOGOUT,
  payload: null
})

const userReducer: Reducer<UserState, IAction<UserState>> = (state = defaultUser, action: IAction<UserState>) => {
  const {type, payload} = action;
  switch (type) {
    case SET_USER_INFO:
      setToken(payload.token);
      return {
        ...state,
        ...payload,
      }
    case SET_USER_LOGOUT:
      removeToken();
      return {
        ...defaultUser,
      }
    default:
      return state;
  }
};

export default userReducer;
