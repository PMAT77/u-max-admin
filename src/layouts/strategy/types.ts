/**
 * 布局策略接口
 * 定义不同布局模式的通用接口
 */
import type { Component } from 'vue'

export type LayoutMode = 'vertical' | 'sidebar' | 'top'

export interface LayoutStrategy {
  /**
   * 获取布局模式
   */
  mode: LayoutMode

  /**
   * 侧边栏宽度
   */
  sidebarWidth: number

  /**
   * 折叠时侧边栏宽度
   */
  collapsedWidth: number

  /**
   * 是否显示 Logo
   */
  showLogo: boolean

  /**
   * Logo 是否大尺寸
   */
  bigLogo: boolean

  /**
   * 是否显示侧边栏
   */
  showSidebar: boolean

  /**
   * 是否显示顶部导航
   */
  showTopbar: boolean

  /**
   * 侧边栏类名
   */
  sidebarClass: string

  /**
   * 头部类名
   */
  headerClass: string

  /**
   * 获取 Logo 组件
   */
  getLogoComponent(): Component | null

  /**
   * 获取导航栏组件
   */
  getNavbarComponent(): Component | null

  /**
   * 获取侧边栏组件
   */
  getSiderbarComponent(): Component | null

  /**
   * 设置侧边栏宽度
   */
  setSidebarWidth(width: number): void

  /**
   * 设置折叠宽度
   */
  setCollapsedWidth(width: number): void

  /**
   * 设置大 Logo
   */
  setBigLogo(big: boolean): void
}

export interface LayoutStrategyOptions {
  sidebarWidth?: number
  collapsedWidth?: number
  bigLogo?: boolean
}
