/**
 * 侧边栏布局策略（经典布局）
 * 侧边栏在左侧，顶部有导航栏
 */
import { defineComponent, h } from 'vue'
import type { Component } from 'vue'
import { BaseLayoutStrategy } from './BaseLayoutStrategy'

export class VerticalLayoutStrategy extends BaseLayoutStrategy {
  mode = 'vertical' as const

  get sidebarClass(): string {
    return 'u-max-sider--vertical'
  }

  get headerClass(): string {
    return 'u-max-header--fixed'
  }

  getLogoComponent(): Component | null {
    return defineComponent({
      name: 'VerticalLogo',
      render() {
        return h('div', { class: 'vertical-logo' })
      }
    })
  }

  getNavbarComponent(): Component | null {
    return defineComponent({
      name: 'VerticalNavbar',
      render() {
        return h('div', { class: 'vertical-navbar' })
      }
    })
  }
}
