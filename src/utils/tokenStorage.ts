/**
 * Token 存储工具
 * accessToken 使用 sessionStorage（会话级）
 * refreshToken 使用 localStorage（跨会话续期）
 */
const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

export const setAccessToken = (token: string): void => {
  try {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, token)
  } catch (error) {
    console.error('access token 存储失败:', error)
  }
}

export const getAccessToken = (): string => {
  try {
    return sessionStorage.getItem(ACCESS_TOKEN_KEY) || ''
  } catch (error) {
    console.error('access token 读取失败:', error)
    return ''
  }
}

export const removeAccessToken = (): void => {
  try {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY)
  } catch (error) {
    console.error('access token 删除失败:', error)
  }
}

export const setRefreshToken = (token: string): void => {
  try {
    localStorage.setItem(REFRESH_TOKEN_KEY, token)
  } catch (error) {
    console.error('refresh token 存储失败:', error)
  }
}

export const getRefreshToken = (): string => {
  try {
    return localStorage.getItem(REFRESH_TOKEN_KEY) || ''
  } catch (error) {
    console.error('refresh token 读取失败:', error)
    return ''
  }
}

export const removeRefreshToken = (): void => {
  try {
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  } catch (error) {
    console.error('refresh token 删除失败:', error)
  }
}

export const clearAuthTokens = (): void => {
  removeAccessToken()
  removeRefreshToken()
}
