/**
 * 布局策略抽象基类
 * 提供通用逻辑，不同布局模式继承实现
 */
import type { Component } from 'vue'
import type { LayoutStrategy, LayoutStrategyOptions } from './types'

export abstract class BaseLayoutStrategy implements LayoutStrategy {
  abstract mode: 'vertical' | 'sidebar' | 'top'

  protected _sidebarWidth: number
  protected _collapsedWidth: number
  protected _bigLogo: boolean
  protected _showSidebar: boolean = true
  protected _showTopbar: boolean = true

  constructor(options: LayoutStrategyOptions = {}) {
    this._sidebarWidth = options.sidebarWidth ?? 240
    this._collapsedWidth = options.collapsedWidth ?? 64
    this._bigLogo = options.bigLogo ?? true
  }

  get sidebarWidth(): number {
    return this._sidebarWidth
  }

  get collapsedWidth(): number {
    return this._collapsedWidth
  }

  get bigLogo(): boolean {
    return this._bigLogo
  }

  get showLogo(): boolean {
    return true
  }

  get showSidebar(): boolean {
    return this._showSidebar
  }

  get showTopbar(): boolean {
    return this._showTopbar
  }

  abstract get sidebarClass(): string
  abstract get headerClass(): string

  getLogoComponent(): Component | null {
    return null
  }

  getNavbarComponent(): Component | null {
    return null
  }

  getSiderbarComponent(): Component | null {
    return null
  }

  setSidebarWidth(width: number): void {
    this._sidebarWidth = width
  }

  setCollapsedWidth(width: number): void {
    this._collapsedWidth = width
  }

  setBigLogo(big: boolean): void {
    this._bigLogo = big
  }
}
