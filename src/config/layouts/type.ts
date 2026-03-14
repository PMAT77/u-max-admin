export type LayoutMode = 'vertical' | 'sidebar' | 'top'

export interface LayoutConfig {
  mode: LayoutMode
  sidebarWidth: number
  collapsedWidth: number
  bigLogo: boolean
  showLogo: boolean
  showSidebar: boolean
  showTopbar: boolean
  headerFixed: boolean
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