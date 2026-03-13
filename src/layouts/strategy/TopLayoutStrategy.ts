/**
 * 顶部导航布局策略
 * 侧边栏隐藏在顶部，顶部有导航栏
 */
import { defineComponent, h } from 'vue'
import { BaseLayoutStrategy } from './BaseLayoutStrategy'
import type { Component } from 'vue'

export class TopLayoutStrategy extends BaseLayoutStrategy {
  mode = 'top' as const

  get sidebarClass(): string {
    return 'u-max-sider--top'
  }

  get headerClass(): string {
    return 'u-max-header--fixed'
  }

  getLogoComponent(): Component | null {
    return defineComponent({
      name: 'TopLogo',
      render() {
        return h('div', { class: 'top-logo' })
      }
    })
  }

  getNavbarComponent(): Component | null {
    return defineComponent({
      name: 'TopNavbar',
      render() {
        return h('div', { class: 'top-navbar' })
      }
    })
  }
}
