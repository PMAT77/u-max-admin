/**
 * Naive UI 独立 API
 * 用于在组件外部使用 Naive UI 的 API
 * 如 loadingBar、message、notification、dialog 等
 *
 * 注意：此文件必须在 Pinia 注册后导入
 */
import { createDiscreteApi, darkTheme } from 'naive-ui'
import { computed } from 'vue'
import { useThemeStore } from '@/stores/modules/theme'
import { getPinia } from '@/stores/setup'

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

let naiveApiInstance: ReturnType<typeof createDiscreteApi> | null = null

const discreteApiMap = {
  loadingBar: null as any,
  message: null as any,
  notification: null as any,
  dialog: null as any,
}

const noop = () => {} 
 

export const configProviderProps = computed(() => {
  const themeStore = useThemeStore(getPinia())
  return {
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
  }
})

export const globalLoadingBar = {
  start: () => discreteApiMap.loadingBar?.start?.() || noop,
  finish: () => discreteApiMap.loadingBar?.finish?.() || noop,
  error: () => discreteApiMap.loadingBar?.error?.() || noop,
}

export const globalMessage = {
  info: (content: string) => discreteApiMap.message?.info?.(content) || noop,
  success: (content: string) => discreteApiMap.message?.success?.(content) || noop,
  warning: (content: string) => discreteApiMap.message?.warning?.(content) || noop,
  error: (content: string) => discreteApiMap.message?.error?.(content) || noop,
}

export const globalNotification = {
  info: (content: string) => discreteApiMap.notification?.info?.({ content }) || noop,
  success: (content: string) => discreteApiMap.notification?.success?.({ content }) || noop,
  warning: (content: string) => discreteApiMap.notification?.warning?.({ content }) || noop,
  error: (content: string) => discreteApiMap.notification?.error?.({ content }) || noop,
}

export const globalDialog = {
  info: (content: string) => discreteApiMap.dialog?.info?.({ content }) || noop,
  success: (content: string) => discreteApiMap.dialog?.success?.({ content }) || noop,
  warning: (content: string) => discreteApiMap.dialog?.warning?.({ content }) || noop,
  error: (content: string) => discreteApiMap.dialog?.error?.({ content }) || noop,
}

export default {
  loadingBar: globalLoadingBar,
  message: globalMessage,
  notification: globalNotification,
  dialog: globalDialog,
}
