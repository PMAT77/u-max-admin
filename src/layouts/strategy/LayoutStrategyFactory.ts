/**
 * 布局策略工厂
 * 根据布局模式创建对应的策略实例
 */
import type { LayoutMode, LayoutStrategy, LayoutStrategyOptions } from './types'
import { VerticalLayoutStrategy } from './VerticalLayoutStrategy'
import { SidebarLayoutStrategy } from './SidebarLayoutStrategy'
import { TopLayoutStrategy } from './TopLayoutStrategy'

type StrategyConstructor = new (options?: LayoutStrategyOptions) => LayoutStrategy

const strategies: Array<[LayoutMode, StrategyConstructor]> = [
  ['vertical', VerticalLayoutStrategy as StrategyConstructor],
  ['sidebar', SidebarLayoutStrategy as StrategyConstructor],
  ['top', TopLayoutStrategy as StrategyConstructor]
]

export class LayoutStrategyFactory {
  private static strategyMap = new Map<LayoutMode, StrategyConstructor>(strategies)

  static create(mode: LayoutMode, options?: LayoutStrategyOptions): LayoutStrategy {
    const StrategyClass = this.strategyMap.get(mode)
    if (!StrategyClass) {
      throw new Error(`Unknown layout mode: ${mode}`)
    }
    return new StrategyClass(options)
  }

  static register(mode: LayoutMode, strategyClass: StrategyConstructor): void {
    this.strategyMap.set(mode, strategyClass)
  }

  static getSupportedModes(): LayoutMode[] {
    return Array.from(this.strategyMap.keys())
  }
}
