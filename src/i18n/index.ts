/**
 * 国际化配置
 * 管理应用的多语言支持
 */

import { createI18n } from 'vue-i18n';
import zhCN from './locales/zh-CN';
import enUS from './locales/en-US';

/**
 * 获取存储的语言或默认语言
 */
function getStoredLocale(): string {
  return localStorage.getItem('locale') || 'zh-CN';
}

/**
 * 国际化配置选项
 */
const i18n = createI18n({
  legacy: false, // 使用组合式API
  locale: getStoredLocale(), // 默认语言
  fallbackLocale: 'zh-CN', // 回退语言
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS,
  },
});

/**
 * 设置语言
 * @param locale 语言代码
 */
export function setI18nLocale(locale: string): void {
  (i18n.global.locale as any).value = locale;
  localStorage.setItem('locale', locale);
  document.querySelector('html')?.setAttribute('lang', locale);
}

export default i18n;
