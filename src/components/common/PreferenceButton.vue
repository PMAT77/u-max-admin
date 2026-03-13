/**
 * 偏好设置按钮组件
 * 显示一个浮动按钮，点击后可打开偏好设置面板
 */
<template>
  <n-tooltip trigger="hover" placement="left">
    <template #trigger>
      <n-float-button position="fixed" width="50" height="50" bottom="80" right="20">
        <n-icon :component="Template" />
      </n-float-button>
    </template>
    偏好设置
  </n-tooltip>
</template>

<script setup>
import { Template } from '@vicons/carbon'
</script>

<style scoped>
.n-float-button {
  background: var(--card-color);
}
</style>