/**
 * Pinia Store 外部使用工具
 * 用于在组件外部（如路由守卫、工具函数等）使用 Pinia Store
 */
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// 创建 Pinia 实例
const pinia = createPinia()

// 使用持久化插件
pinia.use(piniaPluginPersistedstate)

/**
 * 获取 Pinia 实例
 * 用于在 main.ts 中注册
 */
export function getPinia() {
  return pinia
}

/**
 * 在组件外部使用 Store 的工具函数
 * 使用方式：
 * ```typescript
 * import { useStoreOutsideSetup } from '@/stores/setup'
 * import { useUserStore } from '@/stores/modules/user'
 * 
 * const userStore = useStoreOutsideSetup(useUserStore)
 * console.log(userStore.isLoggedIn)
 * ```
 */
export function useStoreOutsideSetup<T>(useStore: () => T): T {
  return useStore()
}

/**
 * 导出 Pinia 实例，供 main.ts 使用
 */
export default pinia
