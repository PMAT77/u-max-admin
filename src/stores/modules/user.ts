/**
 * 用户状态管理Store
 * 用于管理用户信息和登录状态
 */
import { defineStore } from 'pinia'
import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  setAccessToken as persistAccessToken,
  setRefreshToken as persistRefreshToken
} from '@/utils/tokenStorage'

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
    refreshToken: string
    userInfo: UserInfo | null
  } => ({
    token: getAccessToken(),
    refreshToken: getRefreshToken(),
    userInfo: null,
  }),

  getters: {
    getToken(): string {
      return this.token
    },
    getRefreshToken(): string {
      return this.refreshToken
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
    hasPermission(): (permission: string) => boolean {
      return (permission: string): boolean => {
        if (!permission) return true
        const permissions = this.userInfo?.permissions || []
        return permissions.includes('*') || permissions.includes(permission)
      }
    },
    hasAnyPermission(): (permissions: string[]) => boolean {
      return (permissions: string[]): boolean => {
        if (!permissions.length) return true
        const userPermissions = this.userInfo?.permissions || []
        if (userPermissions.includes('*')) return true
        return permissions.some((item) => userPermissions.includes(item))
      }
    },
    getEmail(): string {
      return this.userInfo?.email || ''
    },
  },

  actions: {
    setToken(token: string): void {
      this.token = token
      if (token) {
        persistAccessToken(token)
      }
    },
    setRefreshToken(token: string): void {
      this.refreshToken = token
      if (token) {
        persistRefreshToken(token)
      }
    },

    setUserInfo(userInfo: UserInfo): void {
      this.userInfo = userInfo
    },

    login(data: { token: string; refreshToken?: string; userInfo?: UserInfo }): void {
      this.setToken(data.token)
      if (data.refreshToken) {
        this.setRefreshToken(data.refreshToken)
      }
      if (data.userInfo) {
        this.setUserInfo(data.userInfo)
      }
    },

    logout(): void {
      this.token = ''
      this.refreshToken = ''
      this.userInfo = null
      clearAuthTokens()
    },

    updateUserInfo(userInfo: Partial<UserInfo>): void {
      if (this.userInfo) {
        this.userInfo = { ...this.userInfo, ...userInfo }
      }
    },
  },

  persist: {
    pick: ['refreshToken', 'userInfo']
  }
})
