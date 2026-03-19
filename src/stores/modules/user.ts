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
    token: '',
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
    setToken(token: string): void {
      this.token = token
    },

    setUserInfo(userInfo: UserInfo): void {
      this.userInfo = userInfo
    },

    login(data: { token: string; userInfo?: UserInfo }): void {
      this.setToken(data.token)
      if (data.userInfo) {
        this.setUserInfo(data.userInfo)
      }
    },

    logout(): void {
      this.token = ''
      this.userInfo = null
    },

    updateUserInfo(userInfo: Partial<UserInfo>): void {
      if (this.userInfo) {
        this.userInfo = { ...this.userInfo, ...userInfo }
      }
    },
  },

  persist: true
})
