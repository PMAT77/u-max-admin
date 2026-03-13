/**
 * 布局状态管理Store
 * 使用策略模式管理应用的布局配置
 */
import { defineStore } from 'pinia'
import type { LayoutMode, LayoutStrategy, LayoutStrategyOptions } from '@/layouts/strategy'
import { LayoutStrategyFactory } from '@/layouts/strategy'

interface LoginConfig {
  layout: 'left' | 'right' | 'center'
}

interface SidebarState {
  show: boolean
  isCollapse: boolean
}

interface LayoutState {
  mode: LayoutMode
  strategy: LayoutStrategy | null
  sidebar: SidebarState
  login: LoginConfig
}

interface LayoutOptions {
  sidebarWidth?: number
  collapsedWidth?: number
  bigLogo?: boolean
}

export const useLayoutStore = defineStore('layout', {
  state: (): LayoutState => ({
    mode: 'vertical',
    strategy: null,
    sidebar: {
      show: true,
      isCollapse: false,
    },
    login: {
      layout: 'right',
    },
  }),

  getters: {
    getLoginLayout(): 'left' | 'right' | 'center' {
      return this.login.layout
    },

    getLayoutMode(): LayoutMode {
      return this.mode
    },

    getStrategy(): LayoutStrategy | null {
      return this.strategy
    },

    getSidebarShow(): boolean {
      return this.sidebar.show
    },

    getSidebarWidth(): number {
      if(!this.sidebar.show) return 0
      return this.strategy?.sidebarWidth ?? 240
    },

    getCollapsedWidth(): number {
      if(!this.sidebar.show) return 0
      return this.strategy?.collapsedWidth ?? 64
    },

    getIsCollapse(): boolean {
      return this.sidebar.isCollapse
    },

    getBigLogo(): boolean {
      return this.strategy?.bigLogo ?? true
    },

    getShowLogo(): boolean {
      return this.strategy?.showLogo ?? true
    },

    getSidebarClass(): string {
      return this.strategy?.sidebarClass ?? ''
    },

    getHeaderClass(): string {
      return this.strategy?.headerClass ?? ''
    },
  },

  actions: {
    /**
     * 初始化布局策略
     */
    initStrategy(options: LayoutOptions = {}) {
      this.strategy = LayoutStrategyFactory.create(this.mode, {
        sidebarWidth: options.sidebarWidth ?? 240,
        collapsedWidth: options.collapsedWidth ?? 64,
        bigLogo: options.bigLogo ?? true,
      })
    },

    /**
     * 设置布局模式
     * @param mode 布局模式
     * @param options 布局选项
     */
    setLayoutMode(mode: LayoutMode, options?: LayoutOptions): void {
      this.mode = mode
      this.initStrategy(options)
    },

    /**
     * 设置登录页布局
     */
    setLoginLayout(layout: 'left' | 'right' | 'center'): void {
      this.login.layout = layout
    },

    /**
     * 切换侧边栏显示
     */
    toggleSidebar(): void {
      this.sidebar.show = !this.sidebar.show
      // this.sidebar.isCollapse = !this.sidebar.show
    },

    /**
     * 设置侧边栏显示
     */
    setSidebarShow(show: boolean): void {
      this.sidebar.show = show
      // this.sidebar.isCollapse = !show
    },

    /**
     * 设置侧边栏是否折叠
     */
    setIsCollapse(isCollapse: boolean): void {
      this.sidebar.isCollapse = isCollapse 
    },

    /**
     * 设置侧边栏宽度
     */
    setSidebarWidth(width: number): void {
      if (this.strategy) {
        (this.strategy as any)._sidebarWidth = width
      }
    },

    /**
     * 设置折叠宽度
     */
    setCollapsedWidth(width: number): void {
      if (this.strategy) {
        (this.strategy as any)._collapsedWidth = width
      }
    },

    /**
     * 设置大 Logo
     */
    setBigLogo(big: boolean): void {
      if (this.strategy) {
        (this.strategy as any)._bigLogo = big
      }
    },
  },

  persist: true,
})
