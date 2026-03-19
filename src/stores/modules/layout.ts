/**
 * 布局状态管理Store
 * 使用配置驱动的方式管理应用的布局配置
 */
import { defineStore } from 'pinia' 
import { layouts, defaultMode, defaultLayoutConfig } from '@/config/layout/index'
import type { LayoutMode, LayoutConfig, SidebarConfig, LoginConfig } from '@/config/layout/type'

interface LayoutState {
  mode: LayoutMode
  config: LayoutConfig
  sidebar: SidebarConfig
  login: LoginConfig
}

export const useLayoutStore = defineStore('layout', {
  state: (): LayoutState => ({
    mode: defaultMode,
    config: defaultLayoutConfig,
    sidebar: {
      menuTitleCollapsedShow: true,
      show: true,
      isCollapse: false,
    },
    login: {
      layout: 'right',
    },
  }),

  getters: {
    getLayoutMode(): LayoutMode {
      return this.mode
    },

    getConfig(): LayoutConfig {
      return this.config
    },

    getSidebarShow(): boolean {
      return this.sidebar.show && this.config.showSidebar
    },

    getSidebarWidth(): number {
      if (!this.sidebar.show || !this.config.showSidebar) return 0
      return this.sidebar.isCollapse ? this.config.collapsedWidth : this.config.sidebarWidth
    },

    getCollapsedWidth(): number {
      if (!this.sidebar.show || !this.config.showSidebar) return 0
      return this.config.collapsedWidth
    },

    getIsCollapse(): boolean {
      return this.sidebar.isCollapse
    },

    getBigLogo(): boolean {
      return this.config.bigLogo
    },

    getShowLogo(): boolean {
      return this.config.showLogo
    },

    getShowSidebar(): boolean {
      return this.config.showSidebar
    },

    getShowTopbar(): boolean {
      return this.config.showTopbar
    },

    getHeaderFixed(): boolean {
      return this.config.headerFixed
    },

    getSidebarClass(): string {
      return this.config.siderClass
    }, 

    getLogoClass(): string {
      return this.config.logoClass
    },

    getLoginLayout(): 'left' | 'right' | 'center' {
      return this.login.layout
    },

    getIsGap(): boolean {
      return false
    },
  },

  actions: {
    setLayoutMode(mode: LayoutMode): void {
      this.mode = mode
      this.config = layouts[mode] || defaultLayoutConfig
    },

    setLoginLayout(layout: 'left' | 'right' | 'center'): void {
      this.login.layout = layout
    },

    toggleSidebar(show?: boolean): void {
      if (show !== undefined) {
        this.sidebar.show = show
      } else {
        this.sidebar.show = !this.sidebar.show
      }
    },

    setSidebarShow(show: boolean): void {
      this.sidebar.show = show
    },

    setIsCollapse(isCollapse: boolean): void {
      this.sidebar.isCollapse = isCollapse
    },

    toggleCollapse(): void {
      this.sidebar.isCollapse = !this.sidebar.isCollapse
    },
  },

  persist: true
})
