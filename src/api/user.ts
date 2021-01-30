import request, {ResponseData} from "../utils/request";
import {UserState} from "../store/module/user";

export interface LoginData {
  username: string;
  password: string;
}

export function apiLogin(data: LoginData) {
  return request.post<ResponseData<UserState>>('/login', {data})
}
