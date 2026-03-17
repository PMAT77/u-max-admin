/**
 * 验证码相关API
 * 提供获取验证码、验证验证码等功能
 */
import service from './index'

export interface CaptchaResponse {
  captchaId: string
  image: string
}

export interface ApiResponse<T = any> {
  code: number
  message: string
  data?: T
}

export const captchaApi = {
  /**
   * 获取验证码
   * @returns {Promise<ApiResponse<CaptchaResponse>>} 验证码响应
   */
  getCaptcha: (): Promise<ApiResponse<CaptchaResponse>> => {
    return service.get('/captcha')
  },
  
  /**
   * 验证验证码
   * @param {Object} data - 验证参数
   * @param {string} data.captchaId - 验证码ID
   * @param {string} data.captchaCode - 用户输入的验证码
   * @returns {Promise<ApiResponse>} 验证响应
   */
  verifyCaptcha: (data: { captchaId: string; captchaCode: string }): Promise<ApiResponse> => {
    return service.post('/captcha/verify', data)
  }
}
