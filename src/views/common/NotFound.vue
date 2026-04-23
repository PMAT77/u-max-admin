/** * 404页面组件 * 当用户访问不存在的页面时显示 */
<template>
  <div class="min-h-screen flex items-center justify-center px-4" style="background-color: var(--u-bg-page)">
    <div
      class="text-center w-full max-w-100 p-8 md:p-10"
      style="
        background: var(--u-bg-card);
        border-radius: calc(var(--u-radius-base) * 1.5);
        box-shadow: var(--u-shadow-card);
      "
    >
      <h1 class="text-15 md:text-20 leading-none font-700 mb-4" style="color: var(--u-primary-color)">404</h1>
      <h2 class="text-6 font-600 mb-3" style="color: var(--u-text-primary)">页面不存在</h2>
      <p class="text-3.5 leading-6 mb-8" style="color: var(--u-text-secondary)">抱歉，您访问的页面不存在或已被删除</p>
      <n-button type="primary" @click="goHome">返回首页</n-button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

// 路由实例
const router = useRouter();

/**
 * 返回首页
 */
function goHome() {
  router.push('/dashboard/workbench');
}
</script>

