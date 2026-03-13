/**
 * Logo 组件
 * 显示应用的 Logo 和标题
 */
<template>
  <div 
    class="system-logo flex justify-center items-center"  
    :style="{ 
      height: isBigLogo ? `calc(56px + 60px)` : '56px',
      width: layoutStore.getLayoutMode === 'sidebar' ? layoutStore.getSidebarWidth + 'px' : 'auto'
    }"
  >
    <div class="logo-item" :class="{ 'flex-col': isBigLogo }">
      <n-avatar  
        :size="isBigLogo ? 45 : 32" 
        :circle="isBigLogo" 
        :style="{
          color: '#ffffff',
          backgroundColor: '#00a4e4',
        }"
      >
        <n-icon :component="RobotFilled" />
      </n-avatar>
      <n-gradient-text v-if="!layoutStore.getIsCollapse" type="info" class="text-2xl ml-2">  
        UMax Admin
      </n-gradient-text>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useLayoutStore } from '@/stores/layout'
import { RobotFilled } from '@vicons/antd'

// 获取布局状态管理实例
const layoutStore = useLayoutStore()

const isBigLogo = computed(() => layoutStore.getBigLogo && layoutStore.getLayoutMode !== 'sidebar')
</script>

<style scoped lang="scss">
.system-logo {
  display: flex; 
  align-items: center;  
}

.logo-item {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  transition: all .3s cubic-bezier(.4, 0, .2, 1);
  overflow: hidden;
  padding-inline: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>