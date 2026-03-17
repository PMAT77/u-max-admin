/**
 * API请求封装
 * 基于axios创建请求实例，配置拦截器和错误处理
 */
import axios from 'axios'
import { globalMessage } from '@/utils/naive'

/**
 * 创建axios实例
 */
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000
})

/**
 * 从localStorage获取token
 * @returns {string | null} token值
 */
const getToken = (): string | null => {
  return localStorage.getItem('token')
}

/**
 * 处理登录过期
 */
const handleLoginExpired = () => {
  localStorage.removeItem('token')
  globalMessage.warning('登录已过期，请重新登录')
  setTimeout(() => {
    window.location.href = '/auth/login'
  }, 1500)
}

/**
 * 处理权限不足
 */
const handlePermissionDenied = () => {
  globalMessage.error('您没有权限执行此操作')
}

/**
 * 处理服务器错误
 * @param {string} message - 错误信息
 */
const handleServerError = (message: string) => {
  globalMessage.error(message || '服务器内部错误，请稍后重试')
}

/**
 * 处理网络错误
 */
const handleNetworkError = () => {
  globalMessage.error('网络异常，请检查网络连接')
}

/**
 * 处理请求错误
 */
const handleRequestError = () => {
  globalMessage.error('请求配置错误')
}

/**
 * 请求拦截器
 * 用于添加认证信息等
 */
service.interceptors.request.use(
  (config) => {
    // 添加token认证信息
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    handleRequestError()
    return Promise.reject(error)
  }
)

/**
 * 响应拦截器
 * 用于统一处理错误和返回数据
 */
service.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response
      
      switch (status) {
        case 401:
          handleLoginExpired()
          break
        case 403:
          handlePermissionDenied()
          break
        case 404:
          globalMessage.error('请求的资源不存在')
          break
        case 500:
          handleServerError(data.message)
          break
        default:
          globalMessage.error(data.message || '请求失败，请稍后重试')
          break
      }
    } else if (error.request) {
      handleNetworkError()
    } else {
      handleRequestError()
    }
    
    return Promise.reject(error)
  }
)

export default service