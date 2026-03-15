/** * 应用程序根组件 * 负责全局主题配置和路由视图渲染 */
<template>
  <!-- 主题提供者组件，用于全局主题配置 -->
  <ThemeProvider :theme="themeConfig.theme" :primary-color="themeConfig.primaryColor">
    <!-- 路由视图，用于渲染当前路由对应的组件 -->
    <router-view />
  </ThemeProvider>
</template>

<script setup>
import { computed } from 'vue';
import { useThemeStore } from './stores';
import ThemeProvider from './components/common/ThemeProvider.vue';

// 获取主题状态管理实例
const themeStore = useThemeStore();

// 主题配置计算属性
const themeConfig = computed({
  get: () => ({
    theme: themeStore.theme, // 主题模式（亮色/暗色）
    primaryColor: themeStore.primaryColor, // 主题主色
  }),
  set: (value) => {
    themeStore.setTheme(value.theme);
    themeStore.setPrimaryColor(value.primaryColor);
  },
});
</script>

<style></style>
