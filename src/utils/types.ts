export type AnyObject = Record<string, any>;

export type KVObject = {
  key: string,
  value: string
}

export interface MyResponse<T> {
  ok: boolean;
  data?: T;
  /*
  * 200 成功
  * 400 Bad Request:客户端请求有语法错误
  * 401 Unauthorized:请求未经授权，需要身份验证
  * 403 Forbidden: 服务器理解请求，但拒绝执行。通常表示用户没有权限访问资源
  * 404 Not Found: 服务器未找到请求的资源
  * 500 服务器错误
  *  */
  status: 200 | 400 | 403 | 404 | 500 | number;
  error?: string;
  statusText: string; // 响应状态文本
  // headers: any; // 响应头信息
  // 其他响应属性...
}

export type MyResponseWithData<T> = MyResponse<T> & { data: T }

export type MyBoolean = 0 | 1; // 0 false / 1 true
