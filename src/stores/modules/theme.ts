/**
 * 主题状态管理Store
 * 用于管理应用的主题配置，包括主题模式、主色、边框圆角
 */
import { defineStore } from 'pinia'
import { 
  defaultThemeMode, 
  defaultThemeState, 
  primaryColorPresets,
  borderRadiusPresets 
} from '@/config/theme'
import type { ThemeState, ThemeMode, BorderRadiusSize, PrimaryColorPreset, BorderRadiusPreset } from '@/config/theme/type' 


export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    mode: defaultThemeMode as ThemeMode,
    primaryColor: defaultThemeState.primaryColor,
    borderRadius: defaultThemeState.borderRadius as BorderRadiusSize,
  }),

  getters: {
    isDark: (state): boolean => state.mode === 'dark',
    getPrimaryColorPresets: (): PrimaryColorPreset[] => primaryColorPresets,
    getBorderRadiusPresets: (): BorderRadiusPreset[] => borderRadiusPresets,
  },

  actions: {
    setTheme(mode: ThemeMode): void {
      this.mode = mode
    },

    setPrimaryColor(color: string): void {
      this.primaryColor = color
    },

    setBorderRadius(radius: BorderRadiusSize): void {
      this.borderRadius = radius
    },

    toggleTheme(): void {
      this.mode = this.mode === 'light' ? 'dark' : 'light'
    },

    resetTheme(): void {
      this.mode = defaultThemeMode
      this.primaryColor = defaultThemeState.primaryColor
      this.borderRadius = defaultThemeState.borderRadius
    },
  },

  persist: true
,
})
