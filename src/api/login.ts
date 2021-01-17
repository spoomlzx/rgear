import request, {ResponseData} from "../utils/request";


export interface LoginData {
  username: string;
  password: string;
}

export function apiLogin(data: LoginData) {
  return request.post<ResponseData<string>>('/mock/11/login', {data})
}
