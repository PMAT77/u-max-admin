/**
 * 用户相关API
 * 提供用户登录、获取用户信息、登出等功能
 */
import service from './index';

/**
 * API响应接口
 * @template T - 响应数据类型
 */
export interface ApiResponse<T = any> {
  code: number; // 响应状态码
  message: string; // 响应消息
  data?: T; // 响应数据
}

/**
 * 用户信息接口
 */
export interface UserInfo {
  id: number | string; // 用户ID
  username: string; // 用户名
  nickname?: string; // 昵称
  avatar?: string; // 头像
  email?: string; // 邮箱
  phone?: string; // 手机号
  roles?: string[]; // 角色列表
  permissions?: string[]; // 权限列表
}

/**
 * 登录响应接口
 */
export interface LoginResponse {
  token: string; // 登录令牌
  refreshToken?: string; // 刷新令牌
  userInfo: UserInfo; // 用户信息
}

export interface RefreshTokenParams {
  refreshToken: string;
}

/**
 * 登录参数接口
 */
export interface LoginParams {
  username: string;
  password: string;
  captcha?: string;
  captchaId?: string;
}

/**
 * 用户API对象
 */
export const userApi = {
  /**
   * 登录
   * @param {LoginParams} data - 登录参数
   * @returns {Promise<ApiResponse<LoginResponse>>} 登录响应
   */
  login: (data: LoginParams): Promise<ApiResponse<LoginResponse>> => {
    return service.post('/login', data);
  },

  /**
   * 获取用户信息
   * @returns {Promise<ApiResponse<UserInfo>>} 用户信息响应
   */
  getInfo: (): Promise<ApiResponse<UserInfo>> => {
    return service.get('/user/info');
  },

  /**
   * 登出
   * @returns {Promise<ApiResponse>} 登出响应
   */
  logout: (): Promise<ApiResponse> => {
    return service.post('/logout');
  },

  /**
   * 刷新Token
   * @param {RefreshTokenParams} data - 刷新令牌参数
   * @returns {Promise<ApiResponse<{ token: string; refreshToken?: string }>>}
   */
  refreshToken: (
    data: RefreshTokenParams,
  ): Promise<ApiResponse<{ token: string; refreshToken?: string }>> => {
    return service.post('/refresh-token', data);
  },
};
