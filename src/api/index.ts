/**
 * API请求封装
 * 基于axios创建请求实例，配置拦截器和错误处理
 */
import axios from 'axios'
import { globalMessage } from '@/utils/naive'
import { getPinia } from '@/stores/setup'
import { useUserStore } from '@/stores/modules/user'
import { getAccessToken, getRefreshToken } from '@/utils/tokenStorage'

/**
 * 创建axios实例
 */
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000
})

const refreshClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000
})

interface RetryAxiosRequestConfig {
  headers?: Record<string, string>
  _retry?: boolean
  url?: string
}

let refreshingPromise: Promise<string> | null = null

const performTokenRefresh = async (): Promise<string> => {
  if (!refreshingPromise) {
    const userStore = useUserStore(getPinia())
    const refreshToken = userStore.getRefreshToken || getRefreshToken()
    if (!refreshToken) {
      return Promise.reject(new Error('缺少 refresh token'))
    }

    refreshingPromise = refreshClient
      .post('/refresh-token', { refreshToken })
      .then((response) => {
        const payload = response.data?.data || response.data
        const nextAccessToken = payload?.token
        const nextRefreshToken = payload?.refreshToken

        if (!nextAccessToken) {
          throw new Error('刷新 token 失败')
        }

        userStore.setToken(nextAccessToken)
        if (nextRefreshToken) {
          userStore.setRefreshToken(nextRefreshToken)
        }
        return nextAccessToken
      })
      .finally(() => {
        refreshingPromise = null
      })
  }

  return refreshingPromise
}

/**
 * 处理登录过期
 */
const handleLoginExpired = () => {
  const userStore = useUserStore(getPinia())
  userStore.logout()
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
    const userStore = useUserStore(getPinia())
    const token = userStore.getToken || getAccessToken()
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
  async (error) => {
    if (error.response) {
      const { status, data } = error.response
      const originalRequest: RetryAxiosRequestConfig = error.config || {}
      
      switch (status) {
        case 401:
          if (
            !originalRequest._retry &&
            originalRequest.url &&
            !originalRequest.url.includes('/refresh-token')
          ) {
            try {
              originalRequest._retry = true
              const nextToken = await performTokenRefresh()
              originalRequest.headers = {
                ...(originalRequest.headers || {}),
                Authorization: `Bearer ${nextToken}`
              }
              return service(originalRequest)
            } catch {
              handleLoginExpired()
            }
          } else {
            handleLoginExpired()
          }
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