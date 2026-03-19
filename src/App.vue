/** * 应用程序根组件 * 负责全局主题配置和路由视图渲染 */
<template>
  <!-- 主题提供者组件，用于全局主题配置 -->
  <ThemeProvider>
    <!-- 路由视图，用于渲染当前路由对应的组件 -->
    <router-view />
  </ThemeProvider>
</template>

<script setup>
import ThemeProvider from './components/common/ThemeProvider.vue';
</script>

<style></style>
