import {IAction} from "../types";
import {Reducer} from "redux";
import {getToken, removeToken, setToken} from "../../utils/token";
import {apiLogin, LoginData} from "../../api/login";

export interface UserState {
  token: string;
  name: string;
  role: string;
}

const defaultUser: UserState = {
  token: getToken(),
  name: "sp",
  role: ""
}

const SET_USER_TOKEN = 'SET_USER_TOKEN';
const SET_USER_INFO = 'SET_USER_INFO';
const SET_USER_LOGOUT = 'SET_USER_LOGOUT';

export const login = (data: LoginData) => (dispatch: any) => {
  return apiLogin(data).then(res => dispatch(setUserToken(res.data)));
}

export const setUserToken: (token: string) => IAction<string> = token => ({
  type: SET_USER_TOKEN,
  payload: token
})

export const setUserInfo: (user: UserState) => IAction<UserState> = (user: UserState) => ({
  type: SET_USER_INFO,
  payload: user
})

export const logout: () => IAction<null> = () => ({
  type: SET_USER_LOGOUT,
  payload: null
})

const userReducer: Reducer<UserState, IAction<any>> = (state = defaultUser, action: IAction<any>) => {
  const {type, payload} = action;
  switch (type) {
    case SET_USER_TOKEN:
      setToken(payload);
      return {
        ...state,
        token: payload
      }
    case SET_USER_INFO:
      return {
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
