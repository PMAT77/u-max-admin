/** * 主题提供者组件 * 用于全局主题配置，包括亮色/暗色模式和主题色定制 */
<template>
  <!-- Naive UI 配置提供者，用于全局主题配置 -->
  <n-config-provider
    :theme="configProviderProps.theme"
    :theme-overrides="configProviderProps.themeOverrides"
    class="h-screen flex flex-col overflow-x-hidden"
    :class="{ 'gap-style': layoutStore.getIsGap }"
  >
    <!-- 全局样式 -->
    <n-global-style />
    <!-- 加载条提供者 -->
    <n-loading-bar-provider>
      <n-notification-provider>
        <n-message-provider>
          <!-- 插槽，用于插入子组件 -->
          <slot />
        </n-message-provider>
      </n-notification-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup>
import { computed } from 'vue';
import { NConfigProvider, NGlobalStyle } from 'naive-ui';
import { useThemeStore, useLayoutStore } from '@/stores';
import { configProviderProps } from '@/utils/naive';

// 获取主题状态管理实例
const themeStore = useThemeStore();
// 获取布局状态管理实例
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
