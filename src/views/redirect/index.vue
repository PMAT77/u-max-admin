/** * 重定向路由组件 * 用于实现页面刷新功能 */
<template>
  <div></div>
</template>

<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

onBeforeMount(() => {
  const { query } = route;
  const path = route.params.path;

  // 跳转到目标路由
  router.replace({
    path: '/' + (Array.isArray(path) ? path.join('/') : path),
    query,
  });
});
</script>
