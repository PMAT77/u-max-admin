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

<script setup>
import { NConfigProvider, NGlobalStyle } from 'naive-ui';
import { useThemeStore, useLayoutStore } from '@/stores';
import { configProviderProps } from '@/utils/naive';
import NaiveProvider from './NaiveProvider.vue';

const themeStore = useThemeStore();
const layoutStore = useLayoutStore();
</script>

<style lang="scss">
.gap-style .u-max-layout__aside,
.gap-style .u-max-layout__scrollbar {
  margin-right: 10px;
}

.gap-style .u-max-layout__header {
  border-radius: 0 0 var(--border-radius) var(--border-radius);
}
</style>
