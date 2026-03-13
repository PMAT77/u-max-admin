/**
 * 用户相关API
 * 提供用户登录、获取用户信息、登出等功能
 */
import service from './index'

/**
 * API响应接口
 * @template T - 响应数据类型
 */
export interface ApiResponse<T = any> {
  code: number // 响应状态码
  message: string // 响应消息
  data?: T // 响应数据
}

/**
 * 用户信息接口
 */
export interface UserInfo {
  id: number // 用户ID
  username: string // 用户名
  name: string // 姓名
  roles?: string[] // 角色列表
  permissions?: string[] // 权限列表
}

/**
 * 登录响应接口
 */
export interface LoginResponse {
  token: string // 登录令牌
  user: UserInfo // 用户信息
}

/**
 * 用户API对象
 */
export const userApi = {
  /**
   * 登录
   * @param {Object} data - 登录参数
   * @param {string} data.username - 用户名
   * @param {string} data.password - 密码
   * @returns {Promise<ApiResponse<LoginResponse>>} 登录响应
   */
  login: (data: { username: string; password: string }): Promise<ApiResponse<LoginResponse>> => {
    return service.post('/login', data)
  },
  
  /**
   * 获取用户信息
   * @returns {Promise<ApiResponse<UserInfo>>} 用户信息响应
   */
  getInfo: (): Promise<ApiResponse<UserInfo>> => {
    return service.get('/user/info')
  },
  
  /**
   * 登出
   * @returns {Promise<ApiResponse>} 登出响应
   */
  logout: (): Promise<ApiResponse> => {
    return service.post('/logout')
  }
}