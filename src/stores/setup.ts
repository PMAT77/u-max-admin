/**
 * Pinia Store 配置
 * 用于创建 Pinia 实例、注册插件和提供组件外部使用 Store 的工具
 */
import { createPinia } from 'pinia' 
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' 
import type { App } from 'vue'

const pinia = createPinia() 

export function getPinia() {
  return pinia
} 

export function setupStore(app : App) {
  app.use(pinia)
  pinia.use(piniaPluginPersistedstate)
}

export default pinia
