/**
 * 主题提供者组件
 * 用于全局主题配置，包括亮色/暗色模式和主题色定制
 */
<template>
  <!-- Naive UI 配置提供者，用于全局主题配置 -->
  <n-config-provider
    :theme="currentTheme" 
    :theme-overrides="themeOverrides" 
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
import { computed } from 'vue'
import { NConfigProvider, NGlobalStyle, darkTheme } from 'naive-ui'
import { useThemeStore } from '@/stores/theme'
import { useLayoutStore } from '@/stores/layout'

/**
 * 组件属性
 */
const props = defineProps({
  /**
   * 主题模式（亮色/暗色）
   * @default 'dark'
   */
  theme: {
    type: String,
    default: 'dark',
    validator: (value) => ['light', 'dark'].includes(value)
  },
  /**
   * 主题主色
   * @default '#667eea'
   */
  primaryColor: {
    type: String,
    default: '#667eea'
  }
})

// 获取主题状态管理实例
const themeStore = useThemeStore()
// 获取布局状态管理实例
const layoutStore = useLayoutStore()

/**
 * 当前主题计算属性
 * 根据props.theme返回对应的主题对象
 */
const currentTheme = computed(() => {
  return props.theme === 'dark' ? darkTheme : undefined
})

/**
 * 主题覆盖配置计算属性
 * 根据主题状态生成主题覆盖配置
 */
const themeOverrides = computed(() => {
  return {
    common: {
      primaryColor: themeStore.primaryColor, // 主色
      primaryColorHover: lightenColor(themeStore.primaryColor, 10), // 主色 hover 状态
      primaryColorPressed: darkenColor(themeStore.primaryColor, 10), // 主色 按下状态
      primaryColorSuppl: themeStore.primaryColor, // 主色补充色
      borderRadius: themeStore.borderRadius // 边框圆角
    }
  }
})

/**
 * 颜色变亮函数
 * @param {string} color - 颜色值（十六进制）
 * @param {number} percent - 变亮百分比
 * @returns {string} 变亮后的颜色值
 */
function lightenColor(color, percent) {
  const num = parseInt(color.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = (num >> 8 & 0x00FF) + amt
  const B = (num & 0x0000FF) + amt
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 + (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 + (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)
}

/**
 * 颜色变暗函数
 * @param {string} color - 颜色值（十六进制）
 * @param {number} percent - 变暗百分比
 * @returns {string} 变暗后的颜色值
 */
function darkenColor(color, percent) {
  const num = parseInt(color.replace('#', ''), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) - amt
  const G = (num >> 8 & 0x00FF) - amt
  const B = (num & 0x0000FF) - amt
  return '#' + (0x1000000 + (R > 0 ? R : 0) * 0x10000 + (G > 0 ? G : 0) * 0x100 + (B > 0 ? B : 0)).toString(16).slice(1)
}
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