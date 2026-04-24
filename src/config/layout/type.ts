export type LayoutMode = 'vertical' | 'sidebar' | 'horizontal'

export interface LayoutConfig {
  mode: LayoutMode
  sidebarWidth: number
  collapsedWidth: number
  bigLogo: boolean
  showLogo: boolean
  showSidebar: boolean
  showTopbar: boolean
  headerFixed: boolean
  showBreadcrumb: boolean
  showBreadcrumbIcon: boolean
  showTagView: boolean
  showTagIcon: boolean
  menuSplit: boolean
  showMenuBorder: boolean
  isGap: boolean
  headerHeight: number
  tagHeight: number
  siderClass: string
  logoClass: string
}

export interface SidebarConfig {
  show: boolean
  isCollapse: boolean
  menuTitleCollapsedShow: boolean
}

export interface LoginConfig {
  layout: 'left' | 'right' | 'center'
}