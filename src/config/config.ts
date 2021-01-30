export interface Config {
  // 请求成功响应码
  SUCCESS_CODE: number;
  // 用户token过期响应码
  LOGIN_EXPIRE: number;
  // 请求地址
  API_URL: string;
  // token的名称
  TOKEN_KEY: string;
  // 页面标题
  TITLE: string;
  // logo图标
  LOGO?: string;
}

const AdminConfig: Config = {
  SUCCESS_CODE: 200,
  LOGIN_EXPIRE: 400,
  API_URL: 'http://127.0.0.1:3000/mock/11',
  TOKEN_KEY: 'Gear_Token',
  TITLE: 'Gear',
}

export default AdminConfig;
