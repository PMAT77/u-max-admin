/** * 主题提供者组件 * 用于全局主题配置，包括亮色/暗色模式和主题色定制 */
<template>
  <n-config-provider
    :theme="configProviderProps.theme"
    :theme-overrides="configProviderProps.themeOverrides"
    class="h-screen flex flex-col overflow-x-hidden"
    :class="{ 'gap-style': layoutStore.getIsGap }"
  >
    <n-global-style />
    <NaiveProvider>
      <slot />
    </NaiveProvider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { watchEffect } from 'vue'
import { NConfigProvider, NGlobalStyle } from 'naive-ui';
import { useThemeStore, useLayoutStore } from '@/stores';
import { areaThemeActiveAlpha, areaThemePalettes } from '@/config/theme';
import { configProviderProps } from '@/utils/naive';
import NaiveProvider from './NaiveProvider.vue';

const themeStore = useThemeStore();
const layoutStore = useLayoutStore();

interface AreaTokens {
  bg: string
  border: string
  text: string
  itemHoverBg: string
  itemActiveBg: string
}

function hexToRgba(color: string, alpha: number): string {
  const hex = color.replace('#', '').trim()
  const full = hex.length === 3
    ? hex.split('').map((ch) => ch + ch).join('')
    : hex
  const value = Number.parseInt(full, 16)
  if (Number.isNaN(value)) {
    return `rgba(47, 84, 235, ${alpha})`
  }
  const r = (value >> 16) & 255
  const g = (value >> 8) & 255
  const b = value & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function resolveAreaTokens(mode: 'light' | 'dark', tone: 'light' | 'dark', primaryColor: string): AreaTokens {
  const palette = areaThemePalettes[mode][tone]
  const itemActiveBg = hexToRgba(primaryColor, areaThemeActiveAlpha[tone])
  return {
    ...palette,
    itemActiveBg,
  }
}

watchEffect(() => {
  const root = document.documentElement
  const mode = themeStore.isDark ? 'dark' : 'light'
  const siderTokens = resolveAreaTokens(mode, themeStore.siderTheme, themeStore.primaryColor)
  const headerTokens = resolveAreaTokens(mode, themeStore.headerTheme, themeStore.primaryColor)
  root.dataset.theme = mode
  root.style.setProperty('--u-primary-color', themeStore.primaryColor)
  root.style.setProperty('--u-radius-base', themeStore.borderRadius)
  root.style.setProperty('--u-layout-sidebar-width', `${layoutStore.getConfig.sidebarWidth}px`)
  root.style.setProperty('--u-layout-collapsed-width', `${layoutStore.getConfig.collapsedWidth}px`)
  root.style.setProperty('--u-layout-header-height', `${layoutStore.getHeaderHeight}px`)
  root.style.setProperty('--u-layout-tag-height', `${layoutStore.getTagHeight}px`)
  root.style.setProperty('--u-sider-bg-color', siderTokens.bg)
  root.style.setProperty('--u-sider-border-color', siderTokens.border)
  root.style.setProperty('--u-sider-text-color', siderTokens.text)
  root.style.setProperty('--u-sider-item-hover-bg', siderTokens.itemHoverBg)
  root.style.setProperty('--u-sider-item-active-bg', siderTokens.itemActiveBg)
  root.style.setProperty('--u-header-bg-color', headerTokens.bg)
  root.style.setProperty('--u-header-border-color', headerTokens.border)
  root.style.setProperty('--u-header-text-color', headerTokens.text)
  root.style.setProperty('--u-header-item-hover-bg', headerTokens.itemHoverBg)
})
</script>

