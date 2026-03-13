/**
 * 关于页面组件
 * 显示项目的基本信息
 */
<template>
  <div class="about">
    <n-card title="关于页面">
      <p>这是一个基于Vue3+Vite+Naive UI的后台管理项目</p>
    </n-card>
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@use '../../styles/variables.scss' as *;

.about {
  padding: $spacing-lg;
  background-color: #f5f7fa;
  min-height: 100vh;
}
</style>