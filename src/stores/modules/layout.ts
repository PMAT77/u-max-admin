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
    config: { ...defaultLayoutConfig },
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

    getShowBreadcrumb(): boolean {
      return this.config.showBreadcrumb
    },

    getShowBreadcrumbIcon(): boolean {
      return this.config.showBreadcrumbIcon
    },

    getShowTagView(): boolean {
      return this.config.showTagView
    },

    getShowTagIcon(): boolean {
      return this.config.showTagIcon
    },

    getMenuSplit(): boolean {
      return this.config.menuSplit
    },

    getShowMenuBorder(): boolean {
      return this.config.showMenuBorder
    },

    getHeaderHeight(): number {
      return this.config.headerHeight
    },

    getTagHeight(): number {
      return this.config.tagHeight
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
      return this.config.isGap
    },
  },

  actions: {
    setLayoutMode(mode: LayoutMode): void {
      this.mode = mode
      const modeConfig = layouts[mode] || defaultLayoutConfig
      this.config = {
        ...modeConfig,
        showTopbar: this.config.showTopbar,
        headerFixed: this.config.headerFixed,
        showBreadcrumb: this.config.showBreadcrumb,
        showBreadcrumbIcon: this.config.showBreadcrumbIcon,
        showTagView: this.config.showTagView,
        showTagIcon: this.config.showTagIcon,
        menuSplit: this.config.menuSplit,
        showMenuBorder: this.config.showMenuBorder,
        isGap: this.config.isGap,
        headerHeight: this.config.headerHeight,
        tagHeight: this.config.tagHeight,
      }
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

    setShowSidebarConfig(show: boolean): void {
      this.config.showSidebar = show
      if (!show) {
        this.sidebar.show = false
        this.sidebar.isCollapse = false
      }
    },

    setIsCollapse(isCollapse: boolean): void {
      this.sidebar.isCollapse = isCollapse
    },

    setShowTopbar(show: boolean): void {
      this.config.showTopbar = show
    },

    setHeaderFixed(fixed: boolean): void {
      this.config.headerFixed = fixed
    },

    setShowBreadcrumb(show: boolean): void {
      this.config.showBreadcrumb = show
    },

    setShowBreadcrumbIcon(show: boolean): void {
      this.config.showBreadcrumbIcon = show
    },

    setShowTagView(show: boolean): void {
      this.config.showTagView = show
    },

    setShowTagIcon(show: boolean): void {
      this.config.showTagIcon = show
    },

    setMenuSplit(split: boolean): void {
      this.config.menuSplit = split
      if (this.mode === 'horizontal') {
        this.config.showSidebar = split
        if (!split) {
          this.sidebar.show = false
          this.sidebar.isCollapse = false
        } else {
          this.sidebar.show = true
        }
      }
    },

    setShowMenuBorder(show: boolean): void {
      this.config.showMenuBorder = show
    },

    setIsGap(isGap: boolean): void {
      this.config.isGap = isGap
    },

    setHeaderHeight(height: number): void {
      this.config.headerHeight = height
    },

    setTagHeight(height: number): void {
      this.config.tagHeight = height
    },

    toggleCollapse(): void {
      this.sidebar.isCollapse = !this.sidebar.isCollapse
    },

    resetLayout(): void {
      this.mode = defaultMode
      this.config = { ...defaultLayoutConfig }
      this.sidebar = {
        menuTitleCollapsedShow: true,
        show: true,
        isCollapse: false,
      }
      this.login = {
        layout: 'right',
      }
    },
  },

  persist: {
    /** 旧版持久化字段 `top` → `horizontal` */
    afterHydrate: (ctx) => {
      const store = ctx.store as unknown as {
        mode: LayoutMode | 'top'
        setLayoutMode: (m: LayoutMode) => void
      }
      if (store.mode === 'top') {
        store.setLayoutMode('horizontal')
      }
    },
  },
})
