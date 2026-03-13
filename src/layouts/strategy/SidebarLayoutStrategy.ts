/**
 * 侧边栏布局策略（现代布局）
 * 侧边栏可折叠，顶部有导航栏
 */
import { defineComponent, h } from 'vue'
import type { Component } from 'vue'
import { BaseLayoutStrategy } from './BaseLayoutStrategy'

export class SidebarLayoutStrategy extends BaseLayoutStrategy {
  mode = 'sidebar' as const

  get showLogo(): boolean {
    return false
  }

  get sidebarClass(): string {
    return 'u-max-sider--sidebar'
  }

  get headerClass(): string {
    return 'u-max-header--fixed'
  }

  getLogoComponent(): Component | null {
    return defineComponent({
      name: 'SidebarLogo',
      render() {
        return h('div', { class: 'sidebar-logo' })
      }
    })
  }

  getNavbarComponent(): Component | null {
    return defineComponent({
      name: 'SidebarNavbar',
      render() {
        return h('div', { class: 'sidebar-navbar' })
      }
    })
  }
}
