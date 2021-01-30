import {getToken} from "./token";
import {extend, RequestOptionsInit} from 'umi-request';
import {notification} from 'antd';
import AdminConfig from "../config/config";

export interface ResponseData<T> {
  code: number;
  data: T;
  msg: string;
}

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: any; }) => {
  const {response} = error;

  if (response && response.status) {
    // @ts-ignore
    const errorText = codeMessage[response.status] || response.statusText;
    const {status, url} = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  }

  return response;
};
const request = extend({
  // 默认错误处理
  errorHandler,
  prefix: '/mock/11'
});

// request拦截器, 改变url 或 options.
request.interceptors.request.use((url: string, options: RequestOptionsInit) => {
  let token = getToken();
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: token
    }
  }
  return ({
    url: url,
    options: options,
  });
})

// response拦截器, 处理response
request.interceptors.response.use(async (response: Response, options: RequestOptionsInit) => {
  const data = await response.clone().json();
  if (data.code === AdminConfig.LOGIN_EXPIRE) {

  }
  // 如果请求成功
  if (data.code === AdminConfig.SUCCESS_CODE) {
    return response;
  }
  // 如果请求失败
  return Promise.reject(new Error(data.msg));
});


export default request;
