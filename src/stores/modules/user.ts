/**
 * 用户状态管理Store
 * 用于管理用户信息和登录状态
 */
import { defineStore } from 'pinia'

export interface UserInfo {
  id: string | number
  username: string
  nickname?: string
  avatar?: string
  email?: string
  phone?: string
  roles?: string[]
  permissions?: string[]
}

export const useUserStore = defineStore('user', {
  state: (): {
    token: string
    userInfo: UserInfo | null
  } => ({
    token: localStorage.getItem('token') || '',
    userInfo: null,
  }),

  getters: {
    getToken(): string {
      return this.token
    },
    getUserInfo(): UserInfo | null {
      return this.userInfo
    },
    isLoggedIn(): boolean {
      return !!this.token
    },
    getUsername(): string {
      return this.userInfo?.username || ''
    },
    getNickname(): string {
      return this.userInfo?.nickname || this.userInfo?.username || ''
    },
    getAvatar(): string {
      return this.userInfo?.avatar || ''
    },
    getRoles(): string[] {
      return this.userInfo?.roles || []
    },
    getPermissions(): string[] {
      return this.userInfo?.permissions || []
    },
    getEmail(): string {
      return this.userInfo?.email || ''
    },
  },

  actions: {
    /**
     * 设置 Token
     * @param token Token 字符串
     */
    setToken(token: string): void {
      this.token = token
      localStorage.setItem('token', token)
    },

    /**
     * 设置用户信息
     * @param userInfo 用户信息对象
     */
    setUserInfo(userInfo: UserInfo): void {
      this.userInfo = userInfo
    },

    /**
     * 登录成功后设置用户数据
     * @param data 登录响应数据
     */
    login(data: { token: string; userInfo?: UserInfo }): void {
      this.setToken(data.token)
      if (data.userInfo) {
        this.setUserInfo(data.userInfo)
      }
    },

    /**
     * 退出登录
     */
    logout(): void {
      this.token = ''
      this.userInfo = null
      localStorage.removeItem('token')
    },

    /**
     * 更新用户信息
     * @param userInfo 部分用户信息
     */
    updateUserInfo(userInfo: Partial<UserInfo>): void {
      if (this.userInfo) {
        this.userInfo = { ...this.userInfo, ...userInfo }
      }
    },
  },

  persist: true,
})
