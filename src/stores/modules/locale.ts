/**
 * 国际化状态管理Store
 * 用于管理应用的语言配置
 */
import { defineStore } from 'pinia';

export type Locale = 'zh-CN' | 'en-US';

export interface LocaleOption {
  label: string;
  key: Locale;
  icon: string;
}

export const useLocaleStore = defineStore('locale', {
  state: (): {
    locale: Locale;
    localeOptions: LocaleOption[];
  } => ({
    locale: 'zh-CN',
    localeOptions: [
      {
        label: '简体中文',
        key: 'zh-CN',
        icon: 'zh',
      },
      {
        label: 'English',
        key: 'en-US',
        icon: 'en',
      },
    ],
  }),

  getters: {
    getLocale(): Locale {
      return this.locale;
    },
    getLocaleOptions(): LocaleOption[] {
      return this.localeOptions;
    },
  },

  actions: {
    setLocale(locale: Locale): void {
      this.locale = locale;
    },
  },

  persist: {
    key: 'locale',
  },
});
