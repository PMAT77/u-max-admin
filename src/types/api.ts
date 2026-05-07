/**
 * API 类型定义
 * 定义API请求和响应的类型
 */

/**
 * API响应基础接口
 */
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
}

/**
 * 登录请求参数
 */
export interface LoginRequest {
  username: string;
  password: string;
}

/**
 * 登录响应数据
 */
export interface LoginResponse {
  token: string;
  user: {
    id: number;
    username: string;
    nickname: string;
    avatar: string;
    roles: string[];
  };
}

/**
 * 手机号登录请求参数
 */
export interface PhoneLoginRequest {
  phone: string;
  code: string;
}

/**
 * 用户信息响应数据
 */
export interface UserInfoResponse {
  id: number;
  username: string;
  nickname: string;
  avatar: string;
  roles: string[];
  permissions: string[];
}
