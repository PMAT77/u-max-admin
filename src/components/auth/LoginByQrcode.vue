/**
 * 扫码登录组件
 * 用于生成登录二维码
 */
<template>
  <div class="max-w-260px pt-1 mb-4"> 
    <div class="flex flex-col items-center gap-3">
      <!-- 二维码 -->
      <n-qr-code :value="text" :size="180" :padding="0" />
      <!-- 刷新二维码按钮 -->
      <n-button text size="large" type="primary">
        <template #icon>
          <n-icon :component="Restart" />
        </template>
        刷新二维码
      </n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>  
import { ref } from 'vue'
import { Restart } from '@vicons/carbon'

/**
 * 二维码内容
 */
const text = ref('https://pmat77.github.io/PMAT77')
</script>

<style lang="scss" scoped>
  
</style>
