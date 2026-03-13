/**
 * 主题状态管理Store
 * 用于管理应用的主题配置，包括主题模式、主色、边框圆角和登录页布局
 */
import { defineStore } from 'pinia'

/**
 * 主题Store
 */
export const useThemeStore = defineStore('theme', {
  /**
   * 状态定义
   */
  state: (): {
    theme: 'light' | 'dark' // 主题模式（亮色/暗色）
    primaryColor: string // 主题主色
    borderRadius: '0rem' | '0.25rem' | '0.5rem' | '0.75rem' | '1rem' // 边框圆角
  } => ({
    theme: 'dark', // 默认暗色主题
    primaryColor: '#297acf', // 默认主色
    borderRadius: '0.5rem', // 默认边框圆角
  }),
  
  /**
   * 计算属性
   */
  getters: {
    /**
     * 是否为暗色主题
     * @returns {boolean} 是否为暗色主题
     */
    isDark: (state): boolean => state.theme === 'dark'
  },
  
  /**
   * 操作方法
   */
  actions: {
    /**
     * 设置主题模式
     * @param {('light' | 'dark')} theme - 主题模式
     */
    setTheme(theme: 'light' | 'dark'): void {
      this.theme = theme
    },
    
    /**
     * 设置主题主色
     * @param {string} color - 主题主色
     */
    setPrimaryColor(color: string): void {
      this.primaryColor = color
    },
    
    /**
     * 切换主题模式
     */
    toggleTheme(): void {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
    },
  },
  
  /**
   * 持久化配置
   * 启用持久化，将主题配置保存到本地存储
   */
  persist: true
})