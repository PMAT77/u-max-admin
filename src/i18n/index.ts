/**
 * 国际化配置
 * 管理应用的多语言支持
 */

import { createI18n } from 'vue-i18n'
import zhCN from './locales/zh-CN'
import enUS from './locales/en-US'

/**
 * 国际化配置选项
 */
const i18n = createI18n({
  legacy: false, // 使用组合式API
  locale: localStorage.getItem('locale') || 'zh-CN', // 默认语言
  fallbackLocale: 'zh-CN', // 回退语言
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
})

export default i18n
