/**
 * Naive UI 独立 API
 * 用于在组件外部使用 Naive UI 的 API
 * 如 loadingBar、message、notification、dialog 等
 * 
 * 注意：此文件必须在 Pinia 注册后导入
 */
import { createDiscreteApi, darkTheme } from 'naive-ui'
import { computed } from 'vue'
import { setActivePinia } from 'pinia'
import { useThemeStore } from '@/stores/modules/theme'
import pinia from '@/stores/setup'

// 设置当前活跃的 Pinia 实例
setActivePinia(pinia)

// 获取 themeStore
const themeStore = useThemeStore()

/**
 * 颜色变亮函数
 */
function lightenColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = ((num >> 8) & 0x00ff) + amt
  const B = (num & 0x0000ff) + amt
  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  )
}

/**
 * 颜色变暗函数
 */
function darkenColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) - amt
  const G = ((num >> 8) & 0x00ff) - amt
  const B = (num & 0x0000ff) - amt
  return (
    '#' +
    (0x1000000 + (R > 0 ? R : 0) * 0x10000 + (G > 0 ? G : 0) * 0x100 + (B > 0 ? B : 0))
      .toString(16)
      .slice(1)
  )
}

// 动态计算 configProviderProps，实现主题响应式更新
const configProviderProps = computed(() => ({
  theme: themeStore.isDark ? darkTheme : null,
  themeOverrides: {
    common: {
      primaryColor: themeStore.primaryColor,
      primaryColorHover: lightenColor(themeStore.primaryColor, 10),
      primaryColorPressed: darkenColor(themeStore.primaryColor, 10),
      primaryColorSuppl: themeStore.primaryColor,
      borderRadius: themeStore.borderRadius,
    },
  },
}))

const { loadingBar, message, notification, dialog } = createDiscreteApi(
  ['loadingBar', 'message', 'notification', 'dialog'],
  {
    configProviderProps,
  }
)

/**
 * 全局 Naive UI API
 * 可在组件外部使用
 */
export const naiveApi = {
  loadingBar,
  message,
  notification,
  dialog,
}

/**
 * 全局 loadingBar
 */
export const globalLoadingBar = loadingBar

/**
 * 全局 message
 */
export const globalMessage = message

/**
 * 全局 notification
 */
export const globalNotification = notification

/**
 * 全局 dialog
 */
export const globalDialog = dialog

export default naiveApi
