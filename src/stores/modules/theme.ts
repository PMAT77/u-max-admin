/**
 * 主题状态管理Store
 * 用于管理应用的主题配置，包括主题模式、主色、边框圆角和登录页布局
 */
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: (): {
    theme: 'light' | 'dark'
    primaryColor: string
    borderRadius: '0rem' | '0.25rem' | '0.5rem' | '0.75rem' | '1rem'
  } => ({
    theme: 'dark',
    primaryColor: '#297acf',
    borderRadius: '0.5rem',
  }),

  getters: {
    isDark: (state): boolean => state.theme === 'dark'
  },

  actions: {
    setTheme(theme: 'light' | 'dark'): void {
      this.theme = theme
    },

    setPrimaryColor(color: string): void {
      this.primaryColor = color
    },

    toggleTheme(): void {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    },
  },

  persist: true
})
