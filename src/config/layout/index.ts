/**
 * 布局配置
 * 使用配置驱动的方式管理不同布局模式的样式和行为
 */
import type { LayoutMode, LayoutConfig } from './type'

export const layouts: Record<LayoutMode, LayoutConfig> = {
  vertical: {
    mode: 'vertical',
    sidebarWidth: 220,
    collapsedWidth: 64,
    bigLogo: true,
    showLogo: true,
    showSidebar: true,
    showTopbar: true,
    headerFixed: true,
    showBreadcrumb: true,
    showBreadcrumbIcon: true,
    showTagView: true,
    showTagIcon: true,
    menuSplit: false,
    showMenuBorder: false,
    isGap: false,
    headerHeight: 56,
    tagHeight: 47,
    siderClass: 'u-max-sider--vertical',
    logoClass: 'u-max-logo--vertical',
  },
  sidebar: {
    mode: 'sidebar',
    sidebarWidth: 220,
    collapsedWidth: 64,
    bigLogo: true,
    showLogo: false,
    showSidebar: true,
    showTopbar: true,
    headerFixed: true,
    showBreadcrumb: true,
    showBreadcrumbIcon: true,
    showTagView: true,
    showTagIcon: true,
    menuSplit: false,
    showMenuBorder: false,
    isGap: false,
    headerHeight: 56,
    tagHeight: 47,
    siderClass: 'u-max-sider--sidebar',
    logoClass: 'u-max-logo--sidebar',
  },
  top: {
    mode: 'top',
    sidebarWidth: 220,
    collapsedWidth: 64,
    bigLogo: false,
    showLogo: false,
    showSidebar: false,
    showTopbar: true,
    headerFixed: true,
    showBreadcrumb: true,
    showBreadcrumbIcon: true,
    showTagView: true,
    showTagIcon: true,
    menuSplit: false,
    showMenuBorder: false,
    isGap: false,
    headerHeight: 56,
    tagHeight: 47,
    siderClass: 'u-max-sider--top',
    logoClass: 'u-max-logo--top',
  },
}

export const defaultMode: LayoutMode = 'vertical'
export const defaultLayoutConfig: LayoutConfig = layouts[defaultMode]
